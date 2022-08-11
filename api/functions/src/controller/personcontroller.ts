/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {db} from "../config/config";

type PeopleType = {
  firstName: string;
  lastName: string;
  participation: Float32Array;
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
    const allEntries: PeopleType[] = [];
    const querySnapshot = await db.collection("people").get();
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));

    return res.status(200).send({
      status: "success",
      message: "people listed successfully",
      people: allEntries});
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
 *            email:
 *              type: string
 *              description: objeto adicionado.
 *              example:{
                        id: id gerado,
                        firstName: Artemis,
                        lastName: Ipsum,
                        participation: 5,
                        }
 */
const addPerson = async (req: Request, res: Response) => {
  const {firstName, lastName, participation} = req.body;
  try {
    const people = db.collection("people").doc();

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
      data: personObject,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};

export {getPeople, addPerson};
