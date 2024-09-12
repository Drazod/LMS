// __tests__/StudentStudy.test.jsx
import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test-util";
import { BrowserRouter as Route } from "react-router-dom";
import * as CourseApi from "@/apis/CourseApi";
import StudentStudy from "./StudentStudy";
jest.mock("@/apis/CourseApi", () => {
  const originalModule = jest.requireActual("@/apis/CourseApi");
  return {
    __esModule: true,
    ...originalModule,
    useGetCourseDetailsQuery: jest.fn(),
    useGetCourseListQuery: jest.fn(),
    useGetSectionQuery: jest.fn(),
  };
});
const courseDetail = {
  payload: {
    courseThumbnail:
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/300405934/original/07d4bd2f3996acb820b981fe478158be478d7533/design-amazing-online-course-thumbnail-for-udemy.png",
    title:
      "Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development",
    description: `Weï¿½re excited youï¿½re here! This course, ï¿½Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development,ï¿½ is the first course in the upcoming Sustainability and Development MasterTrack Certificate program (Fall 2020), but you can also take this course as a stand-alone learning opportunity.   Sustainability and development pose unprecedented challenges as human societies grow and seek to ensure future wellbeing and prosperity. In this course, weï¿½ll focus on addressing the twin challenges of sustainability and development with actionable knowledge for innovating solutions to the worldï¿½s most pressing problems like climate change, poverty and inequality, and biodiversity loss and ecosystem degradation. Rather than sustainability being a qualifier for development (e.g. sustainable development), we conceptualize Sustainability and Development as co-equal fields of inquiry and action that seek to build bridges between the natural, social and applied sciences and the humanities. When sustainability and development are placed on an equal footing, it requires us to think more explicitly about the trade-offs, co-benefits and synergies between them, which we will be exploring in depth in each week.  Throughout the course, you will be introduced to the theoretical currents in Sustainability and Development, and will garner an in-depth understanding of the United Nationsï¿½ 17 Sustainable Development Goals (SDGs). We will also consider the methods and skills necessary for designing innovative solutions to sustainability and development problems through the emerging field of Sustainability Science.  In this course, we will explore three of the most pressing challenges undergirding the  Sustainable Development Goals (SDGs) including climate change, poverty and inequality, and ecosystem degradation and biodiversity loss, with case studies to guide and challenge our thinking. In the final week of the course, we will discuss the trade-offs, co-benefits and synergies between these challenges, especially as they relate to designing innovative solutions for achieving  our sustainability and development goals.  By the end of this course, you will be able to: 1. Understand and explain the worldï¿½s most pressing problems with a specific focus on poverty & inequality, ecosystem degradation and biodiversity loss, and climate change. 2. Critically analyze the Sustainable Development Goals (SDGs) and their relationship to the worldï¿½s most pressing problems. 3. Use frameworks and evidence necessary to develop solutions. 4. Assess relevant solutions that would help realize the SDGs and at the same time solve the pressing problems.  5. Apply skills learned to implement solutions.`,
    price: 172446,
    createdAt: "2021-06-02T21:33:45.250066",
    avgRating: 2.7,
    instructor: {
      instructorId: 3,
      name: "Waka Ranai",
      email: "wakaranai@gmail.com",
      firstName: "Waka",
      lastName: "Ranai",
      phoneNumber: "0900581071",
      avtUrl:
        "https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png",
      publicAvtId: null,
      userAddress: null,
      userCity: null,
      userCountry: null,
      userPostalCode: null,
    },
    category: {
      categoryId: 4,
      categoryName: "Graphic Design",
    },
    sections: [
      {
        sectionId: 1,
        sectionName:
          "Course Summary of Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development",
        position: 1,
      },
      {
        sectionId: 2,
        sectionName:
          "Key Concepts of Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development",
        position: 2,
      },
      {
        sectionId: 3,
        sectionName:
          "Final Thoughts of Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development",
        position: 3,
      },
    ],
  },
};
const current_section = {
  payload: {
    sectionId: null,
    position: null,
    courseCompleted: true,
  },
};
const contents = {
  payload: {
    sectionId: 3,
    sectionName:
      "Final Thoughts of Beyond the Sustainable Development Goals (SDGs): Addressing Sustainability and Development",
    position: 3,
    contents: [
      {
        type: "DOCUMENT",
        content: `<div><article><h1 id="c4a7">Why Do We Struggle with Lack of Sleep? Short tips from Brainlighter Team</h1><p id="cfbc">I want to discuss a big issue many of us face: lack of sleep. Research shows <b>that around one-third of adults don't get enough sleep</b>. This makes us tired, less focused, and can even make us sick.</p><p id="cbc2">At <a href="https://brainlighter.app/">Brainlighter</a>, we've talked a lot about how to get better sleep, and I'd like to share some of our ideas with you.</p><h2 id="a59b">Why Is Good Sleep Hard to Find?</h2><p id="12f1">Many things can make it hard to sleep well. Stress, looking at screens too much, and not having a regular sleep schedule are big reasons.</p><blockquote id="08a9"><p>When we don't sleep enough, <b>our whole day can feel harder.</b></p></blockquote><h2 id="8421">What We Do to Improve Sleep</h2><p id="f0c9">Here are some ways we try to sleep better:</p><ol><li>We try to go to bed and wake up <b>at the same time every day</b>. This helps our bodies know when to sleep.</li><li>We<b> stop using phones and computers</b> before bed. The light from screens can make it hard to fall asleep.</li><li>We do quiet things like reading or listening to soft music to calm down before sleep.</li></ol><figure id="0f4f"><img src="https://cdn-images-1.readmedium.com/v2/resize:fit:800/1*xxOzoRedW_pWBEM2AS9YOA.png"><figcaption></figcaption></figure><p id="9374"><b>\uD83D\uDC49 \uD83D\uDC49 \uD83D\uDC49 <a href="https://brainlighter.app/">Try Brainlighter — Personal Growth Framework</a></b></p><h2 id="2828">Our Team's Path with Sleep</h2><p id="7a9e">By trying these steps, we've started sleeping better. Talking about what works and what doesn't helps us all find better ways to rest.</p><h2 id="b179">Tips to Help You Sleep</h2><p id="d38f">If you're having trouble sleeping, try making a bedtime routine and sticking to it.</p><p id="7274">Turn off your phone before bed, and do something relaxing. Small changes like these can help you sleep better and feel more rested.</p><p id="2753">Sleep is important for everyone, and together, we can learn how to sleep well and feel our best.</p><p id="ba08">Take care,</p><p id="c4ed"><a href="undefined">@bear_in_the_dark - Growth Hackers</a>,</p><p id="7aaa">A Member of the Brainlighter Team \uD83C\uDF1F</p></article><script defer="" src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon="{&quot;rayId&quot;:&quot;8aedddf13ffa04fd&quot;,&quot;version&quot;:&quot;2024.7.0&quot;,&quot;r&quot;:1,&quot;token&quot;:&quot;4af5d1557add4585a1ecb017352c34ac&quot;,&quot;serverTiming&quot;:{&quot;name&quot;:{&quot;cfL4&quot;:true}}}" crossorigin="anonymous"></script> </div>`,
        position: 1,
        id: 3,
      },
    ],
  },
};
describe("StudentStudy Page", () => {
  test("StudentStudy page", () => {
    expect(StudentStudy).toBeDefined();
  });
});
describe("StudentStudy API", () => {
  it("API Pending Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("API Pending Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("API Pending Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("API Reject Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("API Reject Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("API Reject Stage", () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("API Fulfilled Stage", async () => {
    CourseApi.useGetCourseDetailsQuery.mockReturnValue({
      data: current_section,
    });

    CourseApi.useGetCourseListQuery.mockReturnValue({
      data: courseDetail,
    });

    CourseApi.useGetSectionQuery.mockReturnValue({
      data: contents,
    });

    render(
      <Route>
        <StudentStudy />
      </Route>
    );
  });
});
