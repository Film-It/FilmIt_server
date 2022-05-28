const board = require('../models/board');

const formatDate = (date) => {
    let d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = "" + d.getFullYear();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [year, month, day].join("-");
};

 //글 작성
 module.exports.uploadBoard =  async(req, res) => {
    
    const { title, content } = req.body;
    const image = req.file.location;
    const publishedDate = formatDate(new Date());
    const post = new Post({
        title: title,
        content: content, 
        image: image, 
        publishedDate: publishedDate,
        user: req.userInfo,
    });

     try {
         const boardSave = await board.save({});
         res.redirect("/");
     } catch (error) {
         res.status(500).send("upload error!");
     }

 }

 //글 조회
module.exports.getboardsList = async(req, res) => {
    try {
        const boardList = await board.find({});
        res.status(200).render('board', {boards});
    } catch(error) {
        res.status(500).send({error:error.message});
    }
};

 //글 삭제
module.exports.deleteBoard = async(req, res) => {
    const {id} = req.param;
    try {
        res.redirect("/");
    } catch (error) {
        res.status(500).send("delete error!");
    }

}

 //글 수정
module.exports.editBoard = async(req, res) => {
    const {id} = req.params;
    const{title, content} = req.body;
    try {
        await board.findByIdAndUpdate (
            id,
            {title:title, content:content},
            {new:true}
        );
        res.redirect("/")
    } catch (error) {
        res.stauts(500).send("update error!");
    }

    
} 

module.exports = boardController;