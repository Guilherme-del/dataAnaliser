/* eslint-disable max-len */
/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {db} from "../config/config";

type PeopleType = {
  firstName: string;
  lastName: string;
  participation: number;
};

type Request = {
  body: PeopleType;
  params: { peopleId: string };
};

/**
 * @swagger
 *
 * /app/listPerson:
 *   post:
 *     summary: lista de usuarios
 *     tags:
 *       - People
 *     description: lista as pessoas.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso!
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: objeto listado.
 *              example:[{
                        id: id gerado,
                        firstName: Artemis,
                        lastName: Ipsum,
                        participation: 5,
                        }]
 */
const getPeople = async ( req: Request, res: Response) => {
  try {
    const allPeople: PeopleType[] = [];
    const querySnapshot = await db.collection("people").get();
    querySnapshot.forEach((doc: any) => allPeople.push(doc.data()));

    return res.status(200).send({
      status: "success",
      message: "people listed successfully",
      people: allPeople});
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error);
    }
  }
};

/**
 * @swagger
 *
 * /app/addPerson:
 *   post:
 *     summary: Criar novo
 *     tags:
 *       - People
 *     description: Registrar uma nova pessoa.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: firstName
 *         type: string
 *         description: Primeiro Nome da pessoa.
 *         example: "Ártemis"
 *         required: true
 *       - in: body
 *         name: lastName
 *         type: string
 *         description: ultimo nome da pessoa.
 *         example: "Ipsum"
 *         required: true
 *       - in: body
 *         name: participation
 *         type: float
 *         description: participação da pessoa.
 *         example: 5
 *         required: true
 *     responses:
 *       200:
 *         description: Sucesso!
 *         schema:
 *          type: object
 *          properties:
 *              type: string
 *              description: objeto adicionado.
 *              people:{
 *                       id: id gerado,
 *                       firstName: Artemis,
 *                       lastName: Ipsum,
 *                        participation: 5,
 *                        }
 *       400:
 *         description: Error!
 *         schema:
 *         type: object
 *         properties:
 *            people:
 *              type: string
 *              description: nao adicionado.
 */
const addPerson = async (req: Request, res: Response) => {
  const {firstName, lastName, participation} = req.body;
  try {
    const allPeople: PeopleType[] = [];
    const people = db.collection("people").doc();
    const querySnapshot = await db.collection("people").get();
    querySnapshot.forEach((doc: any) => allPeople.push(doc.data()));

    if (typeof participation === "number") {
      const result = allPeople.reduce<number>((accumulator, obj) => {
        return accumulator + obj.participation;
      }, 0);
      if (result + participation > 100) {
        res.status(401).send({
          status: "error",
          message: "people not Added",
        });
      } else {
        const personObject = {
          id: people.id,
          firstName: firstName,
          lastName: lastName,
          participation: participation,
        };
        await people.set(personObject);
        res.status(200).send({
          status: "success",
          message: "people added successfully",
          people: personObject,
        });
      }
    } else {
      res.status(401).send({
        status: "error",
        message: "people not Added",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};

const deletePerson = async (req: Request, res: Response) => {
  const {peopleId} = req.params;

  try {
    const people = db.collection("people").doc(peopleId);

    await people.delete().catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
    return res.status(200).json({
      status: "success",
      message: "person deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};

export {getPeople, addPerson, deletePerson};
