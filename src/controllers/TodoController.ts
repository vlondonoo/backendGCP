import { Request, Response } from "express";
import Todo from '../models/Todo';
/*B-addControllerImports*/

/*Code injected by: Images-alterAddControllerImports*/
import * as fs from 'fs';
/*Code injected by: Images-alterAddControllerImports*/


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

/*Code injected by: Images-alterAddCreateActions*/
let imageName = '';
        if (req.files && req.files.image){
        const image = req.files.image as any;
        imageName = `${Date.now()}_${image.name}`;
        const path = __dirname + "../../../public/images/" + imageName;
        image.mv(path);
        }
/*Code injected by: Images-alterAddCreateActions*/


    await Todo.create({
      message: req.body.message,
      state: "OPEN",
      /*B-addTodoCreateValues*/

/*Code injected by: Images-alterAddTodoCreateValues*/
image: imageName,
/*Code injected by: Images-alterAddTodoCreateValues*/

    });
    res.json({ "res": "Todo created successfully" });
  }

  public static async delete(req: Request, res: Response) {
    const id = req.params.id;
    /*B-addDeleteActions*/

/*Code injected by: Images-alterAddDeleteActions*/
const todoToDelete = await Todo.findByPk(id) as any;
        if(todoToDelete && todoToDelete.image){
            try {
                const path = __dirname + "../../../public/images/" + todoToDelete.image;
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
/*Code injected by: Images-alterAddDeleteActions*/

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