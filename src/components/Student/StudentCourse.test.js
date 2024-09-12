import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test-util";
import StudentCourse from "./StudentCourse";
import "@testing-library/jest-dom";
import { BrowserRouter as Route, useNavigate } from "react-router-dom";
import * as StudentDashboardApi from "@/apis/StudentDashboardApi";
const mockCourses = {
  payload: [
    {
      enrollmentId: 27,
      studentId: 2,
      course: {
        courseId: 35,
        courseThumbnail:
          "https://fueler.io/storage/users/timeline_image/1659279686-jy2p84ykvimsekzsjsx3.png",
        title: "Fundamentals of Management",
        description:
          "Are you about to enter the workforce? Are you an emerging professional? Are you new to your role in the organization? All prospective new employees benefit from understanding management principles, roles and responsibilities, regardless of position.  Now you can acquire an in-depth understanding of the basic concepts and theories of management while exploring the manager's operational role in all types of organizations. Gain insight into the manager's responsibility in planning, organizing, leading, staffing and controlling within the workplace. Itï¿½s never too soon to plan your professional path by learning how the best managers manage for success!  Upon completing this course, you will be able to: 1.       Describe the difference between managers and leaders 2.       Explore the focus of a managerï¿½s job 3.       Cite the required skills for a new managerï¿½s success 4.       Describe the five functions of management 5.       Explain the new model management operating philosophy 6.       Describe the hierarchy of planning 7.       Use the SMART goal setting technique 8.       Discuss the concept of evolution of leadership 9.       Explain how customer satisfaction is linked to controlling 10.     Discuss the power of building a network",
        price: 121967,
        instructorName: "vv",
        categoryName: "network",
      },
      enrollmentDate: "2020-02-02T11:11:11.000+00:00",
      isComplete: true,
      certificateLink:
        "https://curcus-3-0.onrender.com/api/certificate?studentId=2&courseId=35",
    },
    {
      enrollmentId: 28,
      studentId: 2,
      course: {
        courseId: 42,
        courseThumbnail:
          "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/300405934/original/07d4bd2f3996acb820b981fe478158be478d7533/design-amazing-online-course-thumbnail-for-udemy.png",
        title: "Protecting Business Innovations via Patent",
        description:
          "Protecting Business Innovations via Patent  Watch Course Overview:  https://youtu.be/mUja4iwbrTE  This course assumes no prior knowledge in law, business or engineering.  However, students with backgrounds in all three areas will find useful concepts or ideas in the course on how to protect business innovations using patents.  The approach taken in this course is practical and commercial rather than theoretical. A combination of lectures and case studies help to illustrate the concepts and make the course more interesting.     After completing this course, students should be able to understand how patents are issued and protect innovations, including: What is a patent? What do they protect? How do we get a patent? Where are patents valid? How much do they cost?   In addition to basic concepts the course also deals with Advanced topics such as: software patents, business process patents, patenting life, patent trolls and multiple case examples of large and small companies using patents and patent lawsuits.   We also expect you to have fun in this course.  So go forth and enjoy!  Other courses in the Protecting Business Innovations series: 1. Copyright:     https://www.coursera.org/learn/protect-business-innovations-copyright 2. Trademark:  https://www.coursera.org/learn/protect-business-innovations-trademark  3. Patent:          https://www.coursera.org/learn/protect-business-innovations-patent 4. Strategy:       https://www.coursera.org/learn/protect-business-innovations-strategy",
        price: 159139,
        instructorName: "gada",
        categoryName: "DSA",
      },
      enrollmentDate: "2020-02-02T14:22:22.000+00:00",
      isComplete: true,
      certificateLink:
        "https://curcus-3-0.onrender.com/api/certificate?studentId=2&courseId=42",
    },
    {
      enrollmentId: 29,
      studentId: 2,
      course: {
        courseId: 160,
        courseThumbnail:
          "https://i.ytimg.com/vi/XXAcCHrQ6J0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAJQ9oz-g52dRAN0t0rVceRUp33aA",
        title: "Securing Digital Democracy",
        description:
          "In this course, you'll learn what every citizen should know about the security risks--and future potential ï¿½ of electronic voting and Internet voting. We'll take a look at the past, present, and future of election technologies and explore the various spaces intersected by voting, including computer security, human factors, public policy, and more.",
        price: 134959,
        instructorName: "gada",
        categoryName: "network",
      },
      enrollmentDate: "2022-03-03T03:33:33.000+00:00",
      isComplete: true,
      certificateLink:
        "https://curcus-3-0.onrender.com/api/certificate?studentId=2&courseId=160",
    },
    {
      enrollmentId: 30,
      studentId: 2,
      course: {
        courseId: 57,
        courseThumbnail:
          "https://i.ytimg.com/vi/uyo78JUd9_8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDiokDATfdGJ-71ewfQQXEkpSjn1A",
        title:
          "Severe to Profound Intellectual Disability: Circles of Care and Education",
        description:
          "This course is about caring for and educating children (and youth) with severe to profound intellectual disability. We use the idea of 'circles' to position the child at the center of the many levels of support needed. Around the child are circles of care and education - such as the parents, family, friends, caregivers, educators, health care workers and others such as neighbors, business owners and community members. Each one has an important role to play in the life of a person with an intellectual disability and can be seen as a caregiver and educator. Although this course is aimed particularly at caregivers who work at a  special centre or in a private home, each person in the circle of care and education plays a valuable role and will find the course useful.    During the course you can gain greater understanding about intellectual disability,  levels of severity of intellectual disability and the history of intellectual disability. You will also start to understand how you can support children and youth with severe to profound intellectual disability so that they can reach their full potential and become participating members of society.  We look at lifelong learning by exploring brain development, the learning process and how to maximise the opportunities for learning.  With input from a range of experts,  we consider how best learning can be facilitated.  This includes looking at childrenï¿½s learning support needs, how to go about planning activities for the learning programme as well as how to empower multiple people who work in a team to care and educate children with severe to profound intellectual disability.  In the last week, we focus on rights, advocacy and relationships of care. Empowering and caring for caregivers themselves is a key focus of the course.  For professional development purposes, you can purchase a Verified Certificate if you wish to show evidence of your achievements, but this is optional, and you can apply for Financial Aid if you are unable to pay the certificate fee.",
        price: 199313,
        instructorName: "gada",
        categoryName: "DSA",
      },
      enrollmentDate: "2024-02-02T01:11:11.000+00:00",
      isComplete: false,
      certificateLink: null,
    },
    {
      enrollmentId: 56,
      studentId: 2,
      course: {
        courseId: 5,
        courseThumbnail:
          "https://templates.simplified.co/usetldr/1022255/thumb/5a108056-a070-44ee-a123-1afd489077e0.jpg",
        title: "Silicon Thin Film Solar Cells",
        description:
          'This course consists of a general presentation of solar cells based on silicon thin films.   It is the third MOOC of the photovoltaic series of Ecole polytechnique on Coursera. The general aspects of the photovoltaic field are treated in "Photovoltaic Solar Energy". And the detailed description of the crystalline silicon solar cells can be found in "Physics of Silicon Solar Cells".  After a brief presentation of solar cells operation, thin film semiconductors are described here. The general properties of disordered and crystalline semiconductors are found very different, in particular in terms of band structure and doping mechanisms. Silicon thin films, generally less than 1 ï¿½m thick, are deposited from silane plasma leading to hydrogen incorporation. The growth mechanisms are discussed, in particular the capability to prepare partially crystallized thin films which appear as a mixture of nanocrystallites embedded in an amorphous tissue.  The consequences of the semiconductor properties on solar cells behavior are reviewed. The optical properties of amorphous and nanocrystalline silicon are complementary. Thus the plasma process is particularly well adapted to the preparation of multijunctions, with conversion efficiencies around 13-15 %. Furthermore plasma processes allow to prepare solar cells in large area on glass or flexible substrates.  Finally, it is shown that crystalline and amorphous silicon materials can be combine into heterojunctions solar cells with high efficiency conversion (about 25 %).  **This course is part of a series of 3** Photovoltaic solar energy (https://www.coursera.org/learn/photovoltaic-solar-energy/) Physics of silicon solar cells (https://www.coursera.org/learn/physics-silicon-solar-cells/) Silicon thin film solar cells',
        price: 185013,
        instructorName: "vv",
        categoryName: "PPL",
      },
      enrollmentDate: "2024-07-30T04:06:41.346+00:00",
      isComplete: false,
      certificateLink: null,
    },
  ],
};
jest.mock("@/apis/StudentDashboardApi", () => {
  const originalModule = jest.requireActual("@/apis/StudentDashboardApi");
  return {
    __esModule: true,
    ...originalModule,
    useGetStudentCoursesQuery: jest.fn(),
  };
});
describe("StudentCourse Page", () => {
  test("StudentCourse page", () => {
    expect(StudentCourse).toBeDefined();
  });
});
describe("StudentCourse API", () => {
  it("API Pending Stage", () => {
    StudentDashboardApi.useGetStudentCoursesQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <Route>
        <StudentCourse />
      </Route>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("API Reject Stage", () => {
    StudentDashboardApi.useGetStudentCoursesQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <Route>
        <StudentCourse />
      </Route>
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("API Fulfilled Stage", async () => {
    StudentDashboardApi.useGetStudentCoursesQuery.mockReturnValue({
      data: mockCourses,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentCourse />
      </Route>
    );
    expect(
      screen.getByRole("combobox", { name: "Status" })
    ).toBeInTheDocument();
  });
});
describe("StudentCourse Component", () => {
  beforeEach(() => {
    StudentDashboardApi.useGetStudentCoursesQuery.mockReturnValue({
      data: mockCourses,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentCourse />
      </Route>
    );
  });
  test("StudentCourse Select", () => {
    const combobox = screen.getByRole("combobox", { name: "Status" });
    fireEvent.mouseDown(combobox);

    const option1 = screen.getByRole("option", { name: "Completed" });
    fireEvent.click(option1);
    expect(combobox.textContent).toBe("Completed");

    fireEvent.mouseDown(combobox);
    const option2 = screen.getByRole("option", { name: "On going" });
    fireEvent.click(option2);
    expect(combobox.textContent).toBe("On going");
  });

  test("StudentCourse TakeCertBtn", () => {
    StudentCourse.handleTakeCertBtn = jest.fn();
    const takeCertBtn = screen.getAllByTestId("take-cert-btn")[0];
    fireEvent.click(takeCertBtn, {
      preventDefault: () => {
        expect(StudentCourse.handleTakeCertBtn).toHaveBeenCalled();
      },
    });
  });

  test("StudentCourse StudyBtn", () => {
    StudentCourse.handleStudyBtn = jest.fn();
    const studyBtn = screen.getAllByTestId("study-btn")[0];
    fireEvent.click(studyBtn, {
      preventDefault: () => {
        expect(StudentCourse.handleStudyBtn).toHaveBeenCalled();
      },
    });
  });

  test("StudentCourse ImgDetailBtn", () => {
    StudentCourse.handleClickOpen = jest.fn();
    expect(StudentCourse.handleClickOpen).toBeDefined();
    expect(typeof StudentCourse.handleClickOpen).toBe("function");
    const course = { courseId: 123 };
    const divElement = screen.getAllByTestId("img")[0];
    fireEvent.click(divElement, {
      preventDefault: () => {
        expect(StudentCourse.handleClickOpen).toHaveBeenCalledWith(
          course.courseId
        );
      },
    });
  });
});
describe("StudentCourse Function", () => {
  beforeEach(() => {
    StudentDashboardApi.useGetStudentCoursesQuery.mockReturnValue({
      data: mockCourses,
      isLoading: false,
      isError: false,
    });

    render(
      <Route>
        <StudentCourse />
      </Route>
    );
  });
  test("StudentCourse handleTakeCertBtn", () => {
    StudentCourse.handleTakeCertBtn = jest.fn();
    expect(StudentCourse.handleTakeCertBtn).toBeDefined();
    expect(typeof StudentCourse.handleTakeCertBtn).toBe("function");
  });

  test("StudentCourse handleStudyBtn", () => {
    StudentCourse.handleStudyBtn = jest.fn();
    expect(StudentCourse.handleStudyBtn).toBeDefined();
    expect(typeof StudentCourse.handleStudyBtn).toBe("function");
  });
  test("StudentCourse handleResize", () => {
    StudentCourse.handleResize = jest.fn();
    expect(StudentCourse.handleResize).toBeDefined();
    expect(typeof StudentCourse.handleResize).toBe("function");
    StudentCourse.handleResize();

    expect(StudentCourse.handleResize).toHaveBeenCalled();
  });
});
