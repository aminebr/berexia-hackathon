package spark

import org.apache.spark.graphx._
import org.apache.spark.sql.{Dataset, SparkSession}
import org.apache.spark.sql._

import scala.io.Source
import com.crealytics.spark.excel._
import play.api.libs.json._

import org.apache.spark.SparkContext
import org.apache.spark.SparkConf





object SparkTest {

  def bfs[VD, ED](graph: Graph[VD, ED], src: VertexId, dst: VertexId): Seq[VertexId] = {
    if (src == dst) return List(src)

    // The attribute of each vertex is (dist from src, id of vertex with dist-1)
    var g: Graph[(Int, VertexId), ED] =
      graph.mapVertices((id, _) => (if (id == src) 0 else Int.MaxValue, 0L)).cache()

    // Traverse forward from src
    var dstAttr = (Int.MaxValue, 0L)
    while (dstAttr._1 == Int.MaxValue) {
      val msgs = g.aggregateMessages[(Int, VertexId)](
        e => if (e.srcAttr._1 != Int.MaxValue && e.srcAttr._1 + 1 < e.dstAttr._1) {
          e.sendToDst((e.srcAttr._1 + 1, e.srcId))
        },
        (a, b) => if (a._1 < b._1) a else b).cache()

      if (msgs.count == 0) return List.empty

      g = g.ops.joinVertices(msgs) {
        (id, oldAttr, newAttr) =>
          if (newAttr._1 < oldAttr._1) newAttr else oldAttr
      }.cache()

      dstAttr = g.vertices.filter(_._1 == dst).first()._2
    }

    // Traverse backward from dst and collect the path
    var path: List[VertexId] = dstAttr._2 :: dst :: Nil
    while (path.head != src) {
      path = g.vertices.filter(_._1 == path.head).first()._2._2 :: path
    }

    path
  }






  def graphbfs: String =  {


    val conf = new SparkConf().setAppName("Simple Application").setMaster("local[2]")
    val sc = new SparkContext(conf)

    val g = Graph.fromEdgeTuples(
      sc.parallelize(List((1L, 2L), (2L, 3L), (3L, 4L), (2L, 4L), (10L, 11L))),
      defaultValue = 1)

    return ""+bfs(g,1L,4L)
  }










  def Example : String = {

    val sparkS = SparkSession.builder.master("local[4]").getOrCreate




    val df = sparkS.read.format("csv").option("sep", ";").option("inferSchema", "true").option("header", "true").load("C:/Users/Brami/Desktop/berexia/archive_100k_XS/Korea Policy File 100k.csv")

    val path_base : String = "C:/Users/Brami/Desktop/hack/test"
    val r = new scala.util.Random

    val random_int : Int = r.nextInt(10000) ;
    val res_string : String = path_base +random_int
    df.write.format("json").save(res_string)






    return (res_string)


  }




  def csv_Impl (path : String ) : String = {

    val sparkS = SparkSession.builder.master("local[4]").getOrCreate

    val path_base_source : String = "C:/Users/Brami/Desktop/hack/source/"

    val df = sparkS.read.format("csv").option("sep", ";").option("inferSchema", "true").option("header", "true").load(path_base_source + path)

    val path_base_sink : String = "C:/Users/Brami/Desktop/hack/sink/"


    val res_string : String = path_base_sink +"/"+path
    df.write.format("parquet").save(res_string)



    return (res_string)


  }


  def xlsx_Impl (path : String ) : String = {

    val sparkS = SparkSession.builder.master("local[4]").getOrCreate


    val path_base_source : String = "C:/Users/Brami/Desktop/hack/source/"



    val df = sparkS.read
      .format("com.crealytics.spark.excel")
      .option("sheetName", "EA_result_1351") // Required
      .option("useHeader", true) // Required
      .option("endColumn", 30) // Optional, default: Int.MaxValue
      .option("maxRowsInMemory", 20)
      .load(path_base_source+path)



    val path_base_sink : String = "C:/Users/Brami/Desktop/hack/sink/"



    val res_string : String = path_base_sink  + "/" + path
    df.write.format("parquet").save(res_string)




    return (res_string)


  }





  def select (req : String) : String = {

    val sparkS = SparkSession.builder.master("local[4]").getOrCreate



    val path_base_sink : String = "C:/Users/Brami/Desktop/hack/sink/"


    val select : String = req.split(",")(0)

    val filename : String = req.split(",")(1)

    val condition : String = req.split(",")(2)

    val sink_new : String = req.split(",")(3)




    val request : String = select + "  parquet.`" + path_base_sink +filename +  "` " + condition


    val df = sparkS.sql(request)




    val res_path  : String = path_base_sink + sink_new

    df.write.format("parquet").save(res_path)



    return res_path


  }



  def combine (filename1 : String , filename2 : String ) : String = {

    val sparkS = SparkSession.builder.master("local[4]").getOrCreate



    val path_base_sink : String = "C:/Users/Brami/Desktop/hack/sink/"


    val df1 = sparkS.read.format("parquet").load(path_base_sink + filename1)
    val df2 = sparkS.read.format("parquet").load(path_base_sink + filename1)



    val df3 = df1.union(df2)

    val r = scala.util.Random
    val random_int = r.nextInt(1000)
    val res_path  : String = path_base_sink + random_int

    df3.write.format("parquet").save(res_path)



    return res_path


  }









}