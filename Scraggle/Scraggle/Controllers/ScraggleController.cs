using System.Collections.Generic;
using System.Web.Http;
using ScraggleGame;
using Scraggle.Models;

namespace Scraggle.Controllers
{
    public class ScraggleController : ApiController
    {
        private static Scrabble _game;


        [HttpGet]
        [Route("scraggle/startgame")]
        public IHttpActionResult Get()
        {
            _game = new Scrabble(1);
            return Ok();
        }

        [HttpGet]
        [Route("scraggle/getrack")]
        public List<char> GetRack()
        {
            var result = _game.GetRack(0);
            return result;
        }

        [HttpPost]
        [Route("scraggle/submitword/{word}")]
        public bool SubmitWord([FromUri] string word, [FromBody] string[] activeTiles)
        {
            //isLegalPlay

            //is in dict
            var result = _game.CheckWordInDictionary(word);

            if (!result)
            {
                return false;
            }
            //check connecting words

            _game.PlaceWord(word, activeTiles);
            _game.RefillRack();

            return true;
        }
    }
}