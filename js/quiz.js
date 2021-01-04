export class quiz{
    constructor(questions, amounts){
        this.questions=questions;
        this.amounts=amounts;
        this.currentQuestionElement=document.getElementById("current");
        this.totalAmountElemen=document.getElementById("totalAmount"); 
        this.questionsElemen=document.getElementById("question");
        this.rowAnswerElemen=document.getElementById("rowAnswer");
        this.checkElement=document.getElementsByName("answer")
        this.nextElemen=document.getElementById("next");
        this.tryBtnElement=document.getElementById("tryBtn");
        this.scorElement=document.getElementById("score");
        this.scors=0;
        this.currentQuestions=0;
        this.correct=false;
        this.tryBtnElement.addEventListener("click",this.Agin.bind(this))
        this.nextElemen.addEventListener("click",this.nextQusetion.bind(this));
        this.showQusetion();

    }
    nextQusetion(){
        let checkAnswer=[...this.checkElement].filter(element=>element.checked)
        if(checkAnswer.length == 0) {
            $(".alert").fadeIn(500);
        } else {
            $(".alert").fadeOut(0);
            this.correct=this.checkedAnswer(checkAnswer[0].value);
            (this.correct) ? $("#Correct").fadeIn(500,()=>{this.newShow()}) : $("#inCorrect").fadeIn(500,()=>{this.newShow()}) 
        }
       
        
    }
    newShow(){
        $("#Correct").fadeOut(500) ;
        $("#inCorrect").fadeOut(500) ;
        this.currentQuestions++;
        (this.currentQuestions<this.amounts) ? this.showQusetion() : this.finish();
    }
    showQusetion(){
        this.questionsElemen.innerHTML=this.questions[this.currentQuestions].question;
        this.currentQuestionElement.innerHTML=this.currentQuestions+1;
        this.totalAmountElemen.innerHTML=this.amounts;
        let allAnswer=this.getAnswer(this.questions[this.currentQuestions]);
        this.showAnswer(allAnswer);
    }
    getAnswer(answer){
        let arrAnswer=[
            answer.correct_answer,
            ...answer.incorrect_answers
        ]
        let newNumber=[];
        let i = arrAnswer.length;
        let j=0
        while(i--) {
            j=Math.floor(Math.random() * (i+1));
            newNumber.push(arrAnswer[j]);
            arrAnswer.splice(j,1);
        }
        return newNumber
    }
    showAnswer(answerArr){
        let temp=``;
        for(let i=0;i<answerArr.length; i++) {
            temp+=`<div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="${i}" value="${answerArr[i]}">
               ${answerArr[i]}
            </label>
        </div>`
        }
        this.rowAnswerElemen.innerHTML = temp;
    }
    checkedAnswer(answerChecked) {
        let corrects=false;
        if(this.questions[this.currentQuestions].correct_answer == answerChecked) {
            corrects=true;
            this.scors++;
        }else {
            corrects=false;
        }
        return corrects;
    }
    finish(){
        $("#quiz").fadeOut(500,()=>{
            $("#finish").fadeIn(500)
        });
        this.scorElement.innerHTML = `${this.scors} / ${this.amounts}` ;
    }
    Agin(){
        $("#finish").fadeOut(500,()=>{
            $("#setting").fadeIn(500);
        });
    }
}