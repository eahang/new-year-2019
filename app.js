angular.module('app', [
  'ngAnimate'
]).controller('appController', [
  '$scope', '$interval',
  function ($scope, $interval) {
    var newYear = moment('2018-12-31 23:59:59', 'YYYY-MM-DD HH:mm:ss').unix();
    $scope.isNewYear = false;
    $scope.currentDayTime = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"
    };

    var interval = $interval(function () {
      var currentTime = moment().unix();
      var diff = newYear - currentTime;
      if (diff > 0) {
        var duration = moment.duration(diff, 'seconds')
        $scope.currentDayTime.days = padNum(moment.duration(duration).days());
        $scope.currentDayTime.hours = padNum(moment.duration(duration).hours());
        $scope.currentDayTime.minutes = padNum(moment.duration(duration).minutes());
        $scope.currentDayTime.seconds = padNum(moment.duration(duration).seconds());
      } else {
        $scope.isNewYear = true;
        $interval.cancel(interval);
      }
    }, 1000);

    var canv = document.getElementById('myCanvas');
    var ctx = canv.getContext('2d');


    var x = 10, y = canv.height;

    writeWord("Happy New Year", 150, 50)
    writeWord("2019", 300, 150)

    function drawCircle() {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      y -= 2;
      if (y < 0) {
        y = canv.height;
      }
      ctx.fill();
      ctx.closePath();
    }


    function writeWord(word, x, y) {
      ctx.font = "56px Arial";
      var gradient = ctx.createLinearGradient(20, 0, 150, 100);
      $interval(function () {
        gradient.addColorStop(0, "rgb(" + getRandom(255) + ", " + getRandom(255) + ", " + getRandom(255) + ")");
        gradient.addColorStop(1, "rgb(" + getRandom(255) + ", " + getRandom(255) + ", " + getRandom(255) + ")");
        gradient.addColorStop(.5, "rgb(" + getRandom(255) + ", " + getRandom(255) + ", " + getRandom(255) + ")");
        ctx.fillStyle = gradient;
        ctx.fillText(word, x, y);
      }, 200);
    }

    function getRandom(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function padNum(num) {
      if (num < 10) return "0" + num;
      return num;
    }
  }
]).animation('.fade', function () {
  return {
    enter: function (element, done) {
      element.css('display', 'none');
      $(element).fadeIn(1000, function () {
        done();
      });
    },
    leave: function (element, done) {
      $(element).fadeOut(1000, function () {
        done();
      });
    },
    move: function (element, done) {
      element.css('display', 'none');
      $(element).slideDown(500, function () {
        done();
      });
    }
  }
})