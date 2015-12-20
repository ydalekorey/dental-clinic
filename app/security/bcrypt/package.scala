package security

import org.mindrot.jbcrypt.BCrypt

package object bcrypt {
  def hashed(password: String) = BCrypt.hashpw(password, BCrypt.gensalt())
}
