package models

import com.github.nscala_time.time.Imports._

case class Appointment(
                        id: Option[Long],
                        accountId: Option[Long],
                        startTime: DateTime,
                        duration: Duration,
                        name: String)