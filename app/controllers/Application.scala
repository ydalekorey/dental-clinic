package controllers

import jp.t2v.lab.play2.auth.LoginLogout
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, Controller}
import security.{AuthConfigImpl, Credentials}

import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits.defaultContext

class Application extends Controller with LoginLogout with AuthConfigImpl {

  def login = Action.async(parse.json) { implicit request =>
    request.body.validate[Credentials].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("status" ->"Failed", "message" -> JsError.toJson(errors))))
      },
      credentials => {
        accountDAO.authenticate(credentials.email, credentials.password).flatMap {
          case Some(account) => gotoLoginSucceeded(account.id.get)
          case None => Future.successful(BadRequest(Json.obj("status" ->"Failed", "message"->"Email or password is wrong")))
        }
      }
    )
  }

  def logout = Action.async { implicit request =>
    gotoLogoutSucceeded
  }

  def index = Action { implicit request =>
    Ok(views.html.Index())
  }

}