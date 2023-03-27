import knex from "./knex/knex";
import { ISuburbUni } from "../backend/src/types";

const openrouteservice = require("openrouteservice-js");

// Settings
const POLL_RATE = 3000;
const NUMBER_OF_ROWS_TO_PROCESS = 1000;

async function getDistance(
  suburbCoordinate: [number, number],
  uniCoordinate: [number, number]
) {
  let orsDirections = new openrouteservice.Directions({
    api_key: "5b3ce3597851110001cf62488d67712c65a84e7789e8e20460eb16da",
  });

  return orsDirections
    .calculate({
      coordinates: [suburbCoordinate, uniCoordinate],
      profile: "driving-car",
      // extra_info: ["waytype", "steepness"],
      format: "json",
    })
    .then(function (json: DirectionReturnObject) {
      console.log((json.routes[0].summary.distance / 1000).toFixed(2), "km");
      return (json.routes[0].summary.distance / 1000).toFixed(2);
    })
    .catch(function (err: any) {
      console.error(err);
    });
}

class DirectionReturnObject {
  routes: [RouteReturnObject];
  bbox: [number];
  metadata: object;

  constructor(routes: [RouteReturnObject], bbox: [number], metadata: object) {
    this.routes = routes;
    this.bbox = bbox;
    this.metadata = metadata;
  }
}

class RouteReturnObject {
  summary: SummaryObject;
  segments: [object];
  bbox: [number];
  geometry: String;
  way_points: [number];
  extras: object;

  constructor(
    sum: SummaryObject,
    segments: [object],
    bbox: [number],
    geometry: String,
    way_points: [number],
    extras: object
  ) {
    this.summary = sum;
    this.segments = segments;
    this.bbox = bbox;
    this.geometry = geometry;
    this.way_points = way_points;
    this.extras = extras;
  }
}

class SummaryObject {
  distance: number;
  duration: number;

  constructor(distance: number, duration: number) {
    this.distance = distance;
    this.duration = duration;
  }
}

(async function main() {
  const suburb_uni = await knex<ISuburbUni>("DISTANCE_SUBURB_UNI")
    .select("*")
    .where("queried", false)
    .whereNull("distance_in_km")
    .limit(NUMBER_OF_ROWS_TO_PROCESS);

  let intervalId = setInterval(async () => {
    let suburb_uni_pair = suburb_uni.pop();

    if (suburb_uni_pair === undefined) {
      clearInterval(intervalId);
      return;
    }

    console.log(
      `Fetching distance data for uni code - ${suburb_uni_pair.uni_code} and suburb - ${suburb_uni_pair.suburb_name}`
    );

    let isError = false;
    let distance = await getDistance(
      [suburb_uni_pair.suburb_long, suburb_uni_pair.suburb_lat],
      [suburb_uni_pair.uni_long, suburb_uni_pair.uni_lat]
    ).catch(() => {
      distance = -1;
      isError = true;
    });
    await knex("DISTANCE_SUBURB_UNI")
      .where({
        suburb_name: suburb_uni_pair.suburb_name,
        suburb_postcode: suburb_uni_pair.suburb_postcode,
        uni_code: suburb_uni_pair.uni_code,
      })
      .update({
        distance_in_km: distance,
        queried: true,
        error: isError,
      });
  }, POLL_RATE);
})();
