import { z } from "zod";
import { patientSchema } from "@/utils/types";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const mainRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  addPatient: publicProcedure
    .input(patientSchema)
    .mutation(async ({ input, ctx }) => {

      const res = await ctx.prisma.patients.create({
        data: {
          name: input.Name,
          age: input.AGE,
          gender: input.GENDER,
          height: input.HEIGHT,
          weight: input.WEIGHT,
          ap_high: input.AP_HIGH,
          ap_low: input.AP_LOW,
          cholesterol: input.CHOLESTEROL,
          glucose: input.GLUCOSE,
          smoke: input.SMOKE,
          alcohol: input.ALCOHOL,
          physical_activity: input.PHYSICAL_ACTIVITY,
          cardio_disease: input.CARDIO_DISEASE,
        }
      });
      
      return res;
      
    }),

    getPatients: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.patients.findMany();
    }),


    deletePatient: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.patients.delete({
        where: {
          id: input.id.toString(),
        }
      });
    }),


});
