package controllers

import javax.inject.Inject
import org.apache.spark.graphx._
import play.api.mvc._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits._
import org.apache.spark.sql._
import play.libs.F.Tuple



// Spark
import spark.SparkTest


class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {




  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  // A simple example to call Apache Spark
  def test = Action { implicit request =>
  	val sum = SparkTest.Example

    Ok(sum)
  }

  // A non-blocking call to Apache Spark 
  def testAsync = Action.async{
  	val futureSum = Future{SparkTest.Example}
    futureSum.map{ s => Ok(views.html.test_args(s"A non-blocking call to Spark with result: ${s + 1000}"))}
  }






  def csv_impl (path : String ) = Action { implicit request =>
    val sum = SparkTest.csv_Impl(path)

    Ok(sum)
  }

  def csv_test  = Action { implicit request =>
    val path : String = "Korea Policy File 100k.csv"

    val sum = SparkTest.csv_Impl(path)

    Ok(sum)
  }



  def xlsx_Impl (path : String) = Action { implicit request =>
    val sum = SparkTest.xlsx_Impl(path)

    Ok(sum)
  }

  def xlsx_test = Action { implicit request =>

    val path : String = "EA_result_1351.xlsx"
    val sum = SparkTest.xlsx_Impl(path)

    Ok(sum)
  }






  def select_impl (req : String) = Action { implicit request =>
    val sum = SparkTest.select(req)

    Ok(sum)
  }


  def select_test  = Action { implicit request =>

   val req : String = "SELECT * FROM ,EA_result_1351.xlsx, WHERE(1=1) ,tab2"

    val sum = SparkTest.select(req)

    Ok(sum)
  }



  // on suppose que combine est la combinaison de 2 select pour avoir le meme nombre de columns
  //puis on a combine pour faire l'union

  def combine (filename1 : String , filename2 : String) = Action { implicit request =>


    //example upload test and test2 with csv_impl:filename
    //combine (filename1,filename 2 )

    val sum = SparkTest.combine(filename1,filename2)

    Ok(sum)
  }














  def graphtest = Action { implicit request =>


    Ok(SparkTest.graphbfs)
  }







}
