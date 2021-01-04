import {quiz} from './quiz.js'
export class Setting{
    constructor() {
        this.mainCategory=document.getElementById("category");
        this.mainDifficulty=document.getElementsByName("difficulty");
        this.mainNumber=document.getElementById("Number");
        this.mainStartBtn=document.getElementById("startBtn");
        this.mainStartBtn.addEventListener("click",this.startQuiz.bind(this))
    }
    async startQuiz(){
        let amount=this.mainNumber.value;
        let category=this.mainCategory.value;
        let difficulty=[...this.mainDifficulty].filter(elemnt => elemnt.checked);
        let url=`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
        let newResult= await this.fetchUrl(url);
        if(newResult.length>0) {
            $("#setting").fadeOut(500, ()=>{
                $("#quiz").fadeIn(500);
            });
            new quiz(newResult,amount);
        }
    }
    async fetchUrl(url) {
        let respons = await fetch(url);
        let infos = await respons.json();
        return infos.results;
    }
}

//https://opentdb.com/api.php?amount=30&category=18&difficulty=easy