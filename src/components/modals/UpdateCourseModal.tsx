import { Button } from "@nextui-org/button";
import EDForm from "../form/EDForm";
import EDInput from "../form/EDInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateCourseMutation } from "@/src/redux/features/course/coursApi";
import { toast } from "sonner";
const UpdateCourseModal = ({
  filterSingleCourse,
}: {
  filterSingleCourse: any;
}) => {
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    data.credits = Number(data.credits)
    const finalData = { id: filterSingleCourse?.id, data };
    const res = await updateCourse(finalData).unwrap();
    console.log("res", res);
    if(res){
        toast.success(res.message)
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Update Course"
        buttonText="📝"
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
      >
        <EDForm onSubmit={onSubmit}>
          <div className="py-1">
            <EDInput
              label="Name"
              name="name"
              defaultValue={filterSingleCourse?.name}
              required
            ></EDInput>
          </div>
          <div className="py-1">
            <EDInput
              label="Description"
              name="description"
              defaultValue={filterSingleCourse?.description}
            ></EDInput>
          </div>
          <div className="py-1">
            <EDInput
              label="Credits"
              name="credits"
              defaultValue={filterSingleCourse?.credits}
              required
            ></EDInput>
          </div>
          <div className="py-1">
            <EDInput
              label="Photo"
              name="photo"
              defaultValue={filterSingleCourse?.photo}
              required
            ></EDInput>
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Add Course
            </Button>
          </div>
        </EDForm>
      </FXModal>
    </div>
  );
};

export default UpdateCourseModal;
