var friendsAPI = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsAPI);
  });

  app.post("/api/friends", function(req, res) {
    var friendMatch = {
      name: "",
      photograph: "",
      friendDif: 200
    };
    //Grabs userData from survey page
    var userData = req.body;
    var userScores = userData.scores;
    console.log(userData);

    var totalDif;

    for (i = 0; i < friendsAPI.length; i++) {
      var availableFriend = friendsAPI[i];
      // console.log(availableFriend);
      totalDif = 0;

      for (j = 0; j < userScores.length; j++) {
        var userTotal = userScores[j];
        var friendsTotal = availableFriend.scores[j];
        // console.log(userTotal);
        // console.log(friendsTotal);

        totalDif += Math.abs(
          parseInt(userTotal) - Math.abs(parseInt(friendsTotal))
        );
      }
      console.log(totalDif);
      if (totalDif <= friendMatch.friendDif) {
        // Reset the bestMatch to be the new friend.
        friendMatch.name = availableFriend.name;
        friendMatch.photo = availableFriend.photograph;
        friendMatch.friendDif = totalDif;
      }
    }
    console.log(friendMatch);
    friendsAPI.push(req.body);
    res.json(friendMatch);
  });
};
