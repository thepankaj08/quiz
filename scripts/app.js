var app = new Vue(
  {    
    el:"#app",
    data:
    {
        index:0,
        available_sets:[
          {
            "title":"Science","icon":"android","source":science,
          },
          {
            "title":"Polity","icon":"android","source":polity,
          },
        ],
        set_selected_index:0,
        data:null,
        show_exp:false,
        is_dark_on:true,
        show_settings_window:false,
        auto_go_to_next_question:true,
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
      get_dark_mode:function()
      {
        if(this.is_dark_on)
        {
          return "dark bg-gray-800"
        }
        return "bg-white"
      },
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

        //focus question
        this.$refs.head.scrollIntoView()

        //reset bar
        this.$refs.bar.style.width = "0%"
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
          let value=q[what]
          if(what=="question")
          {
            value.indexOf("not correct")!=-1?value = value.replace("not correct",'<span class="font-bold bg-custom-yellow dark:text-black">not correct</span>'):value = value.replace("correct",'<span class="font-bold bg-custom-yellow dark:text-black">correct</span>');
          }
          return value
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
          this.handle_auto_go_to_next_question()
        }else
        {
          div.classList.add("bg-red-50","border-red-300")
          div.querySelector(".text-red-500").classList.remove("hidden")
        }
      },
      update_set:function()
      {
        this.data = this.available_sets[this.set_selected_index].source
      },
      update_question_index:function()
      {
        this.reset_options() 
      },
      handle_auto_go_to_next_question:function()
      {
        if(this.auto_go_to_next_question)
        {
          let that=this
          this.$refs.bar.style.width = "100%"
          setTimeout(function()
          {
            console.log("go to next question")
            that.next()
          },1500)
        }
      },

    }
})

var mc = new Hammer(document.getElementById('app'));
mc.on("swipeleft swiperight", function(ev)
{
    ev.type=="swipeleft"?app.next():1;
    ev.type=="swiperight"?app.prev():1;
});