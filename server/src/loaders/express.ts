import express, { NextFunction, raw } from "express";
import cors from "cors";

import config from "@/config";
import knex from "knex/knex";
import { IdealSuburbRequstQuery, IUniversity } from "@/types";
import { delay } from "@/utils";
import {
  validateWeightageSumNotZero,
  validateWeightageNonNegative,
} from "@/utils/validator";

export default ({ app }: { app: express.Application }) => {
  app.get("/health-check", (req, res) => {
    res.status(200).send("OK");
  });

  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  app.get("/universities", async (req, res) => {
    const result = await knex<IUniversity>("UNIVERSITY").select("*");

    return res.status(200).send(result);
  });

  app.get(
    "/ideal-suburb",
    async (
      req: express.Request<{}, {}, {}, IdealSuburbRequstQuery>,
      res,
      next
    ) => {
      const queryStrings = req.query;

      const { rent, crime_rate, distance, uni_code } = queryStrings;

      if (
        !validateWeightageSumNotZero({
          rent: Number(rent),
          crime_rate: Number(crime_rate),
          distance: Number(distance),
        })
      ) {
        next(new Error("At least one weightage should be non-zero"));
      }

      if (
        !validateWeightageNonNegative({
          rent: Number(rent),
          crime_rate: Number(crime_rate),
          distance: Number(distance),
        })
      ) {
        next(new Error("Weightage cannot be negative"));
      }

      const [suburbsResult, universityResult] = await Promise.all([
        knex.raw(
          `SELECT * FROM get_suburb_scores(?,?,?,?) ORDER BY scaled_overall_score DESC;`,
          [rent, crime_rate, distance, uni_code]
        ),
        knex<IUniversity>("UNIVERSITY")
          .select("uni_name")
          .where("uni_code", uni_code),
      ]);

      // await delay(1500);

      return res.status(200).send({
        count: suburbsResult.rowCount,
        uni_name: universityResult[0].uni_name,
        data: suburbsResult.rows,
      });
    }
  );

  app.use(
    (
      err: any,
      req: Express.Request,
      res: Express.Response,
      next: NextFunction
    ) => {
      console.error(err.stack);
      // @ts-ignore
      res.status(500).send({
        status: 500,
        message: err.message,
      });
    }
  );
};
