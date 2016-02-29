var sketch = angular.module('sketch',[]);
sketch.controller('sketchcontroller',['$scope',function($scope){
	$scope.canvasWH = {width:1100,height:700}

	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
    var current;
    var obj = {
    	line : function(e){
            canvas.onmousemove = function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0)
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
			ctx.lineTo(ev.offsetX,ev.offsetY);
			ctx.stroke()
		    }
          },
        arc : function(e){
   	        canvas.onmousemove = function(ev){
			var m = Math.abs(ev.offsetX-e.offsetX);
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0)
			}
			ctx.beginPath();
			ctx.arc(e.offsetX,e.offsetY,m,0,Math.PI*2)
			ctx.stroke()
		    }
          },
         rect : function(e){
   	        canvas.onmousemove = function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0)
			}
			ctx.beginPath();
				if($scope.csState.style=='fill'){
				   ctx.fillRect(e.offsetX,e.offsetY,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY)
				}else{
				   ctx.strokeRect(e.offsetX,e.offsetY,ev.offsetX-e.offsetX,ev.offsetY-e.offsetY)
				}
		    }
          },
          pencil :function(e){
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
          	canvas.onmousemove = function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0)
			}
			ctx.lineTo(ev.offsetX,ev.offsetY);
			ctx.stroke()
		    }
		},
	    none :function(e){
      	canvas.onmousemove = function(ev){
        ctx.clearRect(ev.offsetX,ev.offsetY,10,10)
	       }
	    }
      }
   $scope.setStyle = function(s){
     $scope.csState.style = s;
   }
   $scope.strokeStyle = '#fff';
   $scope.csState = {
   	 fillStyle:'#000000',
   	 strokeStyle:'#000000',
   	 lineWidth:1,
   	 style:'stroke'
   }   
   $scope.save = function(ev){
   	if(current){
   	 ev.srcElement.href = canvas.toDataURL();
     ev.srcElement.download = 'mypic.png';
   	}else{
   		alert('空画布')
   	}
   }
   $scope.newSketh = function(){
   	if(current){
   		if(confirm('是否保存')){
           location.href = canvas.toDataURL();
   		}
   	  }
   	  clearCanvas();
   	  current = null;
   }
   $scope.frames = {
     直线工具:'line',
     椭圆工具:'arc',
     矩形工具:'rect',
     铅笔工具:'pencil',
     橡皮工具:'none'
   }
   $scope.frame = 'line';
   $scope.tool = function(frame){
   	$scope.frame = frame;
   }
  
   canvas.onmousedown = function(e){
		    ctx.strokeStyle = $scope.csState.strokeStyle;
		    ctx.fillStyle = $scope.csState.fillStyle;
		    ctx.lineWidth = $scope.csState.lineWidth;
		    obj[$scope.frame](e)
			canvas.onmouseup = function(){
			canvas.onmousemove = null;
			canvas.onmouseup = null;
			current = ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height)
		   }
	}

    
}])

