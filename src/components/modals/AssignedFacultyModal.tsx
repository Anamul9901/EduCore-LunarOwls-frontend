import { Button } from "@nextui-org/button";
import EDForm from "../form/EDForm";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAlluserQuery } from "@/src/redux/features/user/userApi";
import { useAddFacultyMutation } from "@/src/redux/features/courseFaculty/courseFacultyApi";

const AssignFaculty = ({
  courseid,
  getCurrentCourseFacultysId,
  
}: {
  courseid: any;
  getCurrentCourseFacultysId: any;
}) => {
  const { data: allUser } = useGetAlluserQuery(undefined);
  const allUserData = allUser?.data;
  const filterFacultyData = allUserData?.filter(
    (item: any) => item?.role === "faculty" && !getCurrentCourseFacultysId.includes(item?.id)
  );
  
  console.log("facutyids", getCurrentCourseFacultysId);
  
  const [addFaculty] = useAddFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submitted Data:", data);
  };

  const handleAddFacultyId = async (id: string) => {
    const data = { facultyId: id, courseId: courseid };
    const res = await addFaculty(data);
    console.log("res", res);
  };

  return (
    <div>
      <FXModal
        title="Assign Faculty to Course"
        buttonText="Assign Faculty"
        buttonClassName="bg-blue-500 text-white px-4 md:px-6 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        <EDForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-4">
            {filterFacultyData?.map((faculty: any, idx: number) => (
              <div
                key={faculty?.id}
                className="bg-white p-4 shadow rounded-lg flex items-center space-x-4"
              >
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {faculty?.name}
                  </h2>
                  <p className="text-gray-500">{faculty?.email}</p>
                </div>
                <Button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleAddFacultyId(faculty?.id)}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </EDForm>
      </FXModal>
    </div>
  );
};

export default AssignFaculty;
