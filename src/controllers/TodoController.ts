import { Request, Response } from "express";
import Todo from '../models/Todo';
/*B-addControllerImports*/

export default class TodoController {
  public static async listClosed(req: Request, res: Response) {
    const closedTodos = await Todo.findAll({ where: { 'state': 'CLOSED' } });
    res.json({ "list": closedTodos });
  }

  public static async listOpen(req: Request, res: Response) {
    const openTodos = await Todo.findAll({ where: { 'state': 'OPEN' } });
    res.json({ "list": openTodos });
  }

  public static async create(req: Request, res: Response) {
    /*B-addCreateActions*/

    await Todo.create({
      message: req.body.message,
      state: "OPEN",
      /*B-addTodoCreateValues*/
    });
    res.json({ "res": "Todo created successfully" });
  }

  public static async delete(req: Request, res: Response) {
    const id = req.params.id;
    /*B-addDeleteActions*/
    await Todo.destroy({ where: { id: id } });
    res.json({ "res": "Todo deleted successfully" });
  }

  public static async update(req: Request, res: Response) {
    const id = req.params.id;
    const state = req.params.state;
    await Todo.update({state: state}, { where: { id: id } });
    res.json({ "res": "Todo updated successfully" });
  }

  /*B-addControllerMethods*/

/*Code injected by: Sorting-alterAddControllerMethods*/
public static async listSortedClosed(req: Request, res: Response) {
        const closedTodos = await Todo.findAll({
        where: { 'state': 'CLOSED' },  order: [['message', req.params.direction]]
        });
        res.json({ "list": closedTodos });
        }

        public static async listSortedOpen(req: Request, res: Response) {
            const openTodos = await Todo.findAll({ 
            where: { 'state': 'OPEN' },  order: [['message', req.params.direction]]
            });
            res.json({ "list": openTodos });
        }
/*Code injected by: Sorting-alterAddControllerMethods*/


}