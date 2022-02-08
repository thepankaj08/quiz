var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

function launch_confetti()
{
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}


var app = new Vue(
  {    
    el:"#app",
    data:
    {
        index:0,
        //science sets
        available_sets:[
          set1,
          set2,
          set3,
          set4,
          set5,
          set6,
          set7,
          set8,
          set9,
          set10,
          set11,
          set12,
          set13,
          set14,
          set15,
          set16,
          set17,
          set18,
          set19,
          set20,
          set21,
          //set22,
          //set23,
          //set24,
          //set25,
          //set26,
          //set27,
          //set28,
          //set29,
          //set30,
          //set31,
          //set32,
          //set33,
          //set34,
          //set35,
          //set36,
          //set37,
          //set38,
          //set39,
          //set40,
        ],
        set_selected_index:0,
        data:null,
        show_exp:false,
    },
    created:function()
    {
      this.data=this.available_sets[this.set_selected_index]
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
        //reset everything
        document.querySelectorAll(".options").forEach((item)=>{
          item.classList.remove("bg-green-50","border-green-300","bg-red-50","border-red-300")
        })
        this.show_exp=false
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
      attempt:function(e,i)
      {
        let answers=["Answer: A","Answer: B","Answer: C","Answer: D"]
        this.check_attempt(e.target,answers[i].trim())
      },
      check_attempt:function(div,useranswer)
      {
        if(this.display_data('answer').trim()==useranswer)
        {
          //correct
          div.classList.add("bg-green-50","border-green-300")
          launch_confetti()
        }else
          div.classList.add("bg-red-50","border-red-300")
      },
      update_set:function()
      {
        this.data=this.available_sets[this.set_selected_index]
        console.log(this.set_selected_index)
      }
    }
})

var mc = new Hammer(document.getElementById('app'));
mc.on("swipeleft swiperight", function(ev)
{
    ev.type=="swipeleft"?app.next():1;
    ev.type=="swiperight"?app.prev():1;
});