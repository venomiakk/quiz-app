# quiz-app

> _version 0.1, 10.02.2024_

## Usage

Create a text file as shown below and simply upload it on the page.  
Enter the number of questions that should be displayed on the quiz page.

### have in mind that:

- refreshing quiz page will cause loose of progress
- for now, there is no support for multiline questions or answers
- for now, there is no support for saving tests on page

---

**available question types:**

> ~~singleChoice: _sc_~~  
> multipleChoice: _mc_  
> ~~inputText: _it_~~

---

**template for multiple choice:**

> question-number,type; question-content  
> x; wrong-answer  
> v; correct-answer  
> ! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<- mark indicating end of question_

**example**

> 1,mp; Question number 1:  
> v; Correct answer number 1  
> v; Correct answer number 2  
> x; Wrong answer number 1  
> !
