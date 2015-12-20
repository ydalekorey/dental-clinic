package controllers

import javax.inject.Inject

import jp.t2v.lab.play2.auth.LoginLogout
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, Controller}
import security.{AccountService, Credentials, AuthConfigImpl}
import play.api.libs.concurrent.Execution.Implicits.defaultContext

import scala.concurrent.Future

class LoginLogoutController @Inject()(private val accountService: AccountService) extends Controller with LoginLogout with AuthConfigImpl {

  def login = Action.async(parse.json) { implicit request =>
    request.body.validate[Credentials].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("status" ->"Failed", "errors" -> JsError.toJson(errors))))
      },
      credentials => {
        accountService.authenticate(credentials.email, credentials.password).flatMap {
          case Some(account) => gotoLoginSucceeded(account.id.get)
          case None => Future.successful(BadRequest(Json.obj("status" ->"Failed", "message"->"Email or password is wrong")))
        }
      }
    )
  }

  def logout = Action.async { implicit request =>
    gotoLogoutSucceeded
  }

}
