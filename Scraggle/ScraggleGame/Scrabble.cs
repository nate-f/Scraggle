//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;

//namespace ScraggleGame
//{
//    public class Scrabble
//    {
//        private List<int> scores;
//        private char[,] Board { get; } = new char[15,15];
//        private List<string> WordsLayed = new List<string>();
//        private List<List<char>> racks = new List<List<char>>();
//        private Queue<char> bag = StaticHelpers.InitializeBag();
//        private readonly string Dictionary_URL = "http://www.dictionary.com/browse/";
//        public Scrabble(int numOfPlayers)
//        {
//            scores = new List<int>();
//            for (int i = 0; i < numOfPlayers; i++)
//            {
//                scores.Add(0);
//                racks.Add(new List<char>());
//            }
//            for (int i = 0; i < scores.Count; i++)
//            {
//                racks[i] = new List<char>();
//                for (int j = 0; j < 7; j++)
//                {
//                    racks[i].Add(bag.Dequeue());
//                }
//            }
//        }

//        public bool IsLegalPlay(int player, string word, Point location, Direction direction)
//        {
//            var hand = new string(racks[player].ToArray());

//            return true;
//        }

//        public bool CheckWordInDictionary(string word)
//        {
//            //rewrite to be faster later
//            var client = new HttpClient();
//            try
//            {
//                var result = client.GetStringAsync(Dictionary_URL + word).Result;
//                return !result.Contains("There are no results");
//            }
//            catch (Exception)
//            {
//                return false;
//            }
//        }

//        public List<string> GetWordsMadeFromPlay(string word, Point location, Direction direction)
//        {
//            var words = new List<string>();
//            var locsTaken = new List<Point>();
//            if (direction == Direction.Horizontal)
//            {
//                for (int i = location.x; i < location.x + word.Length; i++)
//                {
//                    locsTaken.Add(new Point(i, location.y));
//                }
//                foreach (var point in locsTaken)
//                {
//                    if (point.x > 0 && Board[point.x - 1, point.y] != '\n')
//                    {
//                        //add word to words
//                    }
                   
//                }
//            }
//            else
//            {
//                for (int i = location.y; i < location.y + word.Length; i++)
//                {
//                    locsTaken.Add(new Point(location.x, i));
//                }
//            }
//            return null;
//        }

//        public List<char> GetRack(int player)
//        {
//            return racks[player].ToList();
//        }

//        public List<char> RefillRack()
//        {
//            for (var j = racks[0].Count(); j < 7; j++)
//            {
//                racks[0].Add(bag.Dequeue());
//            }
//            return racks[0];
//        }
//    }

//    public class Point
//    {
//        public int x;
//        public int y;

//        private Point()
//        {
//        }

//        public Point(int x, int y)
//        {
//            this.x = x;
//            this.y = y;
//        }
//    }

//    public enum Direction
//    {
//        Vertical,
//        Horizontal
//    }
//}
