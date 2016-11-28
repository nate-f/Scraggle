var scraggleApp = angular.module('scraggleApp', []);

scraggleApp.controller('ScrabbleCtrl', function ($scope, $http) {

    $scope.selectedLetter = "";
    $scope.rackLetters = [];
    $scope.activeBoardTiles = [];
    $scope.currentWord = "";

    var startGame = $http.get("scraggle/startgame");
    startGame.then(function () {
        $scope.getRackLetters();
    });

    $scope.getRackLetters = function () {
        var promise = $http.get("scraggle/getrack");
        promise.then(function (response) {
            $scope.rackLetters = response.data;
        });
    };

    $scope.range = function (min, max, step) {
        step = step || 1;
        var rangeArr = [];
        if (typeof min === 'number' && typeof max == 'number') {
            for (var i = min; i <= max; i += step) {
                rangeArr.push(i);
            }
        } else if (typeof min === 'string' && typeof max == 'string') {
            for (var i = 1; i <= 15; i += step) {
                rangeArr.push("A");
                console.log("rangeArr = " + rangeArr);
            }
        }

        return rangeArr;
    };

    $scope.submitWord = function () {
        angular.forEach($scope.activeBoardTiles,
            function (boardTile) {
                document.getElementById(boardTile).style.backgroundColor = 'lemonchiffon';
            });

        var promise = $http.post("scraggle/submitword/"+ $scope.currentWord, $scope.activeBoardTiles);
        promise.then(function (response) {
            if (response.data) {
                $scope.successfulWord();
            }
            else {
                $scope.failedWord();
            }
        });
        promise.finally(function() {
            var boardTiles = document.getElementsByClassName("boardTile");
            angular.forEach(boardTiles,
                function(boardTile) {
                    boardTile.style.backgroundColor = 'burlywood';
                });
            $scope.currentWord = "";
            $scope.activeBoardTiles = [];
        });
    };

    $scope.successfulWord = function () {
        console.log("successful word");
        //refill rack
        console.log($scope.rackLetters);
        $scope.rackLetters = $scope.getRackLetters();
        console.log($scope.rackLetters);
    }

    $scope.failedWord = function () {
        console.log("failed word");
        //remove letter from board, add it back to rack
        while ($scope.activeBoardTiles.length > 0) {
            var tile = $scope.activeBoardTiles[0];
            var row = tile[0];
            var col = tile[1];
            $scope.selectBoardTile(row, col);
        }
    }

    $scope.selectLetterFromRack = function (letter) {
        $scope.selectedLetter = letter;
        //can I set this from angular expression in html?
    };

    $scope.selectBoardTile = function (row, col) {
        var boardTile = row + col;

        //if user has selected a letter and chosen tile is empty
        if ($scope.selectedLetter && document.getElementById(boardTile).innerHTML === "") {
            $scope.addToBoard($scope.selectedLetter, boardTile);
            $scope.removeFromRack($scope.selectedLetter);
        }
        //check surrounding tiles
        //if user has selected a letter and chosen tile is not empty
        else if ($scope.selectedLetter && document.getElementById(boardTile).innerHTML !== "") {
            //get letter currenlty on board
            var letterToReplace = document.getElementById(boardTile).innerHTML;
            $scope.addToBoard($scope.selectedLetter, boardTile);
            $scope.replaceOnRack(letterToReplace, $scope.selectedLetter);
        }
        //if user has not selected a letter and chosen tile is not empty
        else if ($scope.selectedLetter === "" && document.getElementById(boardTile).innerHTML !== "") {
            //get letter to remove
            var letterToRemove = document.getElementById(boardTile).innerHTML;
            $scope.removeFromBoard(letterToRemove, boardTile);
            $scope.addToRack(letterToRemove);
        }

        $scope.selectedLetter = "";
        //can I call each of these independently from html?       
    };

    $scope.addToBoard = function (letter, tile) {
        //set value of board tile to value of selected letter
        //can I do this with Angular?
        document.getElementById(tile).innerHTML = letter;
        //keep track of active tiles
        $scope.activeBoardTiles.push(tile);
        //build word
        $scope.currentWord += letter;
    }

    $scope.removeFromBoard = function (letter, tile) {
        //reset board tile
        //can I do this with Angular?
        document.getElementById(tile).innerHTML = "";
        //keep track of active tiles
        var i = $scope.activeBoardTiles.indexOf(tile);
        $scope.activeBoardTiles.splice(i, 1);
        //build word
        $scope.currentWord = $scope.currentWord.replace(letter, "");
    }

    $scope.addToRack = function (letter) {
        var i = $scope.rackLetters.indexOf(letter);
        $scope.rackLetters.push(letter);
        //$scope.rackLetters.splice(i, 1);
    };

    $scope.removeFromRack = function (letter) {
        var i = $scope.rackLetters.indexOf(letter);
        $scope.rackLetters.splice(i, 1);
    };

    $scope.replaceOnRack = function (oldLetter, newLetter) {
        var i = $scope.rackLetters.indexOf(newLetter);
        $scope.rackLetters.splice(i, 1, oldLetter);
    };
});