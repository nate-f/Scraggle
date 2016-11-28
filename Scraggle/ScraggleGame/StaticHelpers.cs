//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ScraggleGame
//{
//    public static class StaticHelpers
//    {
//        public static Queue<char> InitializeBag()
//        {
//            string startBag =
//                "aaaaaaaaabbccddddeeeeeeeeeeeeffggghhiiiiiiiiijkllllmmnnnnnnooooooooppqrrrrrrssssttttttuuuuvvwwxyyz..";
//            List<char> bag = new List<char>();
//            foreach (char c in startBag)
//            {
//                bag.Add(c);
//            }
//            Random r = new Random();
//            for (int i = 0; i < 1000; i++)
//            {
//                int a = r.Next(100);
//                int b = r.Next(100);
//                char t = bag[a];
//                bag[a] = bag[b];
//                bag[b] = t;
//            }
//            var finalBag = new Queue<char>();
//            foreach (char c in bag)
//            {
//                finalBag.Enqueue(c);
//            }
//            return finalBag;
//        }
//    }
//}
