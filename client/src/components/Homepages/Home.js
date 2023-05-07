import React, { useRef } from "react";
import Navbar from "./Navbar";
import "../../style.css";
import Fooder from "./Fooder";
import Data from "./Data";
import { Link } from "react-router-dom";
function Home() {
  const Features = useRef();
  const gotofecture = () => {
    window.scrollTo({
      top: Features.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {" "}
      <Navbar></Navbar>
      {/* <Data></Data> */}
      <div className="wrapper my-24  w-full md:flex ">
        <div className="leftdiv">
          <h1 className="text-4xl font-bold hometitle">
            Free Bulk Email Service
          </h1>
          <p className="smalltext">
            Send unlimited emails to your subscribers for free. No credit card.
            <br />
          </p>
          <div className="container button ">
            {/* tewind css btn btn-primary  */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-center rounded  my-6 ml-12 md: ml-14 px-3 ">
              <Link to="/login">Get Started</Link>
            </button>
          </div>
        </div>
        <div className="container video rightbox  mx-auto  justify-center">
          <img
            alt=""
            // className="cover"
            data-src="https://www.sendinblue.com/wp-content/uploads/2020/07/Hero_image-1.png"
            className="cover lazyloaded  w-full imgright "
            src="https://www.sendinblue.com/wp-content/uploads/2020/07/Hero_image-1.png"
          />
        </div>
      </div>
      <section className="section-2" style={{ marginTop: "-80px" }}>
        <div className="md:container  mx-auto">
          <div className="flex flex-wrap">
            <div className=" w-4/5 mx-auto">
              <div className="flex flex-col justify-center h-full infotext">
                <h1 className="text-4xl text-center mb-4 font-bold">
                  Powerful & affordable mass emails
                </h1>
                <p className="text text-gray-600">
                  Whether you’re a small business, a global brand, a lifestyle
                  blogger, or a non-profit organization, Sendinblue lets you
                  create eye-catching email marketing campaigns that boost sales
                  and build better customer relationships. Our free bulk email
                  service offers 300 emails a day and unlimited subscribers.
                  Sendinblue is a cost-effective, intuitive solution for bulk
                  email senders with paid plans starting from as little as $25
                  for 20,000 emails per month. Unlike other bulk email
                  providers, our pricing is based on the number of emails sent
                  rather than the number of contacts stored. This way you can
                  grow your email list without having to worry about increasing
                  prices.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto my-12">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto">
              <div className="flex flex-col justify-center h-full infotext">
                <h1 className="text-4xl text-center mb-3 font-bold">
                  Built for best email marketing results
                </h1>
                <p className="text text-gray-600">
                  ISPs like Gmail and Outlook simply aren’t designed for mass
                  email sends. When sending bulk email campaigns or large
                  volumes of transactional emails, you need a dedicated email
                  marketing software like Sendinblue. As an email service
                  provider, we take care of all your email sending needs and
                  offer the best possible deliverability to land your emails in
                  the inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-3">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full">
                <h1
                  onClick={gotofecture}
                  className="text-4xl text-center mb-4 font-bold"
                >
                  Features
                </h1>
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2020/05/junk_mail-min.png" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-1/2  ">
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Email deliverability you can count on
                      </h1>
                      <p className="text text-gray-600 ">
                        Sendinblue’s bulk email service is built on dedicated
                        deliverability infrastructure and run by a team of
                        deliverability experts. We help you avoid the spam
                        folder and deliver to the inbox every time.
                      </p>
                      <ul className="list-disc ml-3 text-gray-600 ">
                        <li>
                          Rigorous validation process to keep spammers out
                        </li>
                        <li>
                          Closely monitored sender reputations on shared IPs{" "}
                        </li>
                        <li>
                          Rapid email delivery (99.98% of emails deliver in
                          under 20 seconds)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full">
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2  ">
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Easy-to-use email builder
                      </h1>
                      <p className="text text-gray-600 ">
                        Create responsive bulk email marketing campaigns that
                        look great on all screen sizes. Go fast with our
                        drag-and-drop email builder or code from scratch with
                        the HTML editor. Choose from 40+ customizable email
                        templates and insert design elements (text, buttons,
                        images) using drag-and-drop All Sendinblue email
                        templates are responsive across desktop, tablet, and
                        mobile devices Edit the content, change the font, and
                        add images with ease Preview your design on different
                        devices and email clients
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2020/04/Illu-1@2x-1-2.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full">
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2021/02/real_time_statistics-min.png" />
                    </div>
                  </div>

                  <div
                    className="w-full md:w-1/2 lg:w-1/2  "
                    style={{ marginTop: "-40px" }}
                  >
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Spam Mail detection
                      </h1>
                      <p className="text text-gray-600 ">
                        By usgin our spam mail detection you can easily detect
                        spam mails and cant send them to your customers and
                        clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-2 my-9">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full infotext">
                <h1 className="text-4xl text-center mb-4 font-bold">
                  A bulk email service to grow your email list
                </h1>
                <p className="text text-gray-600">
                  The key to bulk email campaign success is a list of engaged
                  subscribers. Use our free bulk email service to gather opt-in
                  subscribers and grow a loyal audience. Our features are
                  designed to keep your email blasts in line with data
                  protection laws like the GDPR (bonus: our servers are based in
                  Europe).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-3 my-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full">
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto  w-[80%] md:w-96 h-full  ">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2020/03/Illu-2@2x-4.png" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-1/2  ">
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Auto send emails to new subscribers and customers
                      </h1>
                      <p className="text text-gray-600 ">
                        Send automated emails to new subscribers and customers
                        and if any festival or any event is going on then you
                        can send them a mail to inform them about the event.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full">
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2  ">
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Import contacts quickly and easily
                      </h1>
                      <p className=" justify-center text-gray-600 ">
                        Already got a contact list or moving from another bulk
                        email provider? We have several easy options for
                        importing existing contacts into your Sendinblue
                        account.
                      </p>
                      <ul className="list-disc ml-3 text-gray-600 ">
                        <li>
                          Import excel, .csv or .txt files in a few simple
                          clicks
                        </li>
                        <li>Manually add new contacts</li>
                        <li>
                          Synchronize contacts from another email provider, CRM
                          or CMS using our custom integrations
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2020/03/Illu-2@2x-1-1.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto">
              <div className="flex flex-col justify-center h-full">
                <div className="flex mx-auto w-full flex-wrap">
                  <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full">
                      <img src="https://www.sendinblue.com/wp-content/uploads/2020/03/Illu-2@2x-1-1.png" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-1/2  ">
                    <div className="flex flex-col justify-center h-full infotext ">
                      <h1 className="text-4xl text-center mb-3 font-bold">
                        Import contacts quickly and easily
                      </h1>
                      <p className="text text-gray-600 ">
                        Already got a contact list or moving from another bulk
                        email provider? We have several easy options for
                        importing existing contacts into your Sendinblue
                        account.
                      </p>
                      <ul className="list-disc ml-3 text-gray-600 ">
                        <li>
                          Import excel, .csv or .txt files in a few simple
                          clicks
                        </li>
                        <li>Manually add new contacts</li>
                        <li>
                          Synchronize contacts from another email provider, CRM
                          or CMS using our custom integrations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-4/5 mx-auto ">
                <div className="flex flex-col justify-center h-full">
                  <div className="flex mx-auto w-full flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-1/2  ">
                      <div className="flex flex-col justify-center h-full infotext ">
                        <h1 className="text-4xl text-center mb-3 font-bold">
                          Email list segmentation
                        </h1>
                        <p className="text text-gray-600 ">
                          For best bulk email results, use advanced segmentation
                          to send targeted messages to different segments of
                          your email marketing list.
                        </p>
                        <ul className="list-disc ml-3 text-gray-600 ">
                          <li>
                            Create different recipient groups by using filters
                            and attributes
                          </li>
                          <li>
                            Segment according to demographics or purchase
                            history
                          </li>
                          <li>
                            Create dynamic lists that automatically update
                            according to subscriber activity
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/2 ">
                      <div className="flex flex-col justify-center items-center mx-auto w-[80%] md:w-96 h-full ">
                        <img src="https://www.sendinblue.com/wp-content/uploads/2020/03/Illu-2@2x-3.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      <section className="section-2 my-9">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-4/5 mx-auto ">
              <div className="flex flex-col justify-center h-full infotext">
                <h1 className="text-4xl text-center  font-bold">
                  Bulk email marketing service with multi-
                </h1>
                <h1 className="text-4xl text-center  font-bold">
                  channel marketing tools{" "}
                </h1>
                <p className="text-center text-gray-600 my-6">
                  Sendinblue's email marketing platform comes equipped with all
                  the tools you need for a multichannel marketing strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className=" container mx-auto w-full grid lg:grid-cols-3 md:grid-cols-1 md:p-3 gap-4">
          <div className="w-4/5 mx-auto">
            <div className="flex flex-col justify-center h-full ">
              <h3 className="text-2xl  ml-20 font-bold relative">
                {" "}
                <img
                  className=" flex top-2  absolute    w-6 h-6"
                  style={{ marginLeft: "-30px" }}
                  src="https://www.sendinblue.com/wp-content/uploads/2020/10/CRM.svg"
                  alt=""
                />
                Sales CRM
              </h3>
              <p className="justify-center text-gray-600 mx-3 my-6">
                Build stronger relationships by keeping track of all your
                customer details in one place.
              </p>
            </div>
          </div>
          <div className="...">
            <div className="flex flex-col justify-center h-full ">
              <h3 className="text-2xl  ml-20 font-bold relative">
                {" "}
                <img
                  className=" flex top-2  absolute    w-6 h-6"
                  style={{ marginLeft: "-30px" }}
                  src="https://www.sendinblue.com/wp-content/uploads/2020/10/Chat.svg"
                  alt=""
                />
                Conversations
              </h3>
              <p className="justify-center text-gray-600 mx-3 my-6">
                Chat with leads and customers on website, WhatsApp, Facebook and
                Instagram DMs.
              </p>
            </div>
          </div>
          <div className="...">
            <div className="flex flex-col justify-center h-full ">
              <h3 className="text-2xl  ml-20 font-bold relative">
                {" "}
                <img
                  className=" flex top-2  absolute    w-6 h-6"
                  style={{ marginLeft: "-30px" }}
                  src="https://www.sendinblue.com/wp-content/uploads/2020/10/SMS-Marketing.svg"
                  alt=""
                />
                SMS Marketing
              </h3>
              <p className="justify-center text-gray-600 mx-3 my-6">
                Reach customers wherever they are with personalized SMS
                messages.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Fooder></Fooder>
    </div>
  );
}

export default Home;
