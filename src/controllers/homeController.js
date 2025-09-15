import db from '../models/index.js';
import CRUDService from '../services/CRUDservices.js' ;

let getHomePage = async (req, res) => {
    try{
        let data =await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch(e)
    {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let getFindAllCrud = async (req, res) => {
    try {
        let data = await CRUDService.getAllUsers();
        return res.render('users/findAllUser.ejs', { datalist: data });
    } catch (e) {
        console.log(e);
    }
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('User created successfully');
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserById(userId);
        return res.render('users/editUser.ejs', { data: userData });
    }else{
        return res.send('User not found');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUserData(data);
    let users = await CRUDService.getAllUsers();
    return res.render('users/findAllUser.ejs', { datalist: users });
}
let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        await CRUDService.deleteUserById(userId);
        let users = await CRUDService.getAllUsers();
        return res.render('users/findAllUser.ejs', { datalist: users });
    } else {
        return res.send('User not found');
    }
}

export default  {
    getHomePage,
    getAboutPage,
    getCRUD,
    getFindAllCrud,
    postCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}
