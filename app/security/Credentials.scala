package security

import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._

case class Credentials(email: String, password: String)

object Credentials {
  implicit val credentialsFormat: Format[Credentials] = (
    (JsPath \ "email").format[String](email) and
      (JsPath \ "password").format[String](minLength[String](3))
    )(Credentials.apply, unlift(Credentials.unapply))
}