package e2e.specs

import e2e.pages.SchedulePage
import generators._
import models.Appointment
import org.scalatestplus.play._

class ScheduleSpec extends PlaySpec with OneServerPerTest with AllBrowsersPerTest {
  override def sharedTests(browser: BrowserInfo): Unit = {
    "Schedule page" must {
      "show daily schedule" when  {
        "daily is chosen" + browser.name in {
          val appointment = generate

          go to schedulePage

          //getAppointments(schedulePage) must contain (appointment)


        }
      }
    }
  }

  def getAppointments(schedulePage: SchedulePage): Seq[Appointment] = {
    Seq.empty
  }

  override lazy val browsers = Vector(FirefoxInfo(firefoxProfile), ChromeInfo)

  private val schedulePage = new SchedulePage
}
