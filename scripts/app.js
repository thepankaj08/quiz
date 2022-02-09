var app = new Vue(
  {    
    el:"#app",
    data:
    {
        index:0,
        available_sets:[
          {
            "title":"Science","icon":"android","source":science,
          }
        ],
        set_selected_index:0,
        data:null,
        show_exp:false,
    },
    created:function()
    {
      this.data = this.available_sets[this.set_selected_index].source
      let that = this
      document.addEventListener("keyup",function(event)
      {
        event.key=="ArrowRight"?that.next():1;
        event.key=="ArrowLeft"?that.prev():1;

        if(parseInt(event.key)>=1 && parseInt(event.key)<=4)
          that.attempt_using_key(parseInt(event.key)-1)

      })
    },
    methods:
    {
      save:function()
      {
        // localStorage.index = this.index
      },
      purge:function()
      {
        localStorage.clear();
      },
      get_local_data:function()
      {
        if(localStorage.index!=undefined)
        {
          this.index = parseInt(localStorage.index)
          isNaN(this.index)?this.index=0:1;
        }
      },
      reset_options:function()
      {
        //reset everything
        document.querySelectorAll(".options").forEach((item)=>
        {
          item.classList.remove("bg-green-50","border-green-300","bg-red-50","border-red-300")
          item.querySelector(".text-green-500").classList.add("hidden")
          item.querySelector(".text-red-500").classList.add("hidden")
        })
        this.show_exp=false

      },
      next:function()
      {
          this.go_to(1)
      },
      prev:function()
      {
        this.go_to(-1)
      },
      go_to:function(step)
      {
        let temp = parseInt(this.index) + parseInt(step)
        if(temp >=0 && temp < this.data.length)
        {
          this.index = temp
        }
        this.reset_options()
      },
      display_data:function(what)
      {
        let q = this.data[this.index]
        if(q!=undefined)
        {
          return q[what]
        }
        return "EOL"
      },
      attempt_using_key:function(i)
      {
        let answers=["Answer: A","Answer: B","Answer: C","Answer: D"]
        let div = document.querySelectorAll(".options")[i]
        this.check_attempt(div,answers[i].trim())
      },
      attempt_using_click:function(e,i)
      {
        let answers=["Answer: A","Answer: B","Answer: C","Answer: D"]
        this.check_attempt(e.target,answers[i].trim())
      },
      check_attempt:function(div,useranswer)
      {
        if(this.display_data('answer').trim()==useranswer)
        {
          div.classList.add("bg-green-50","border-green-300")
          launch_confetti()
          div.querySelector(".text-green-500").classList.remove("hidden")
        }else
        {
          div.classList.add("bg-red-50","border-red-300")
          div.querySelector(".text-red-500").classList.remove("hidden")
        }
      },
      update_set:function()
      {
        this.data=this.available_sets[this.set_selected_index]
        console.log(this.set_selected_index)
      },
      update_question_index:function()
      {
        this.reset_options() 
      }
      
    }
})

var mc = new Hammer(document.getElementById('app'));
mc.on("swipeleft swiperight", function(ev)
{
    ev.type=="swipeleft"?app.next():1;
    ev.type=="swiperight"?app.prev():1;
});