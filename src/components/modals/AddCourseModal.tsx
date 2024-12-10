import { Button } from "@nextui-org/button";
import EDForm from "../form/EDForm";
import EDInput from "../form/EDInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  selectCurrentUser,
  setUser,
} from "@/src/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { useAddCourseMutation } from "@/src/redux/features/course/coursApi";
import EDDateTime from "../form/EDDateTime";

const AddCourseModal = () => {
  const [addCourse, { error, isLoading }] = useAddCourseMutation();
  // if (error) {
  //   toast.error((error as any)?.data?.message);
  // }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const StartDateTime = data.startDate;
    const EndDataTime = data.endDate;

    const startIsoDate = new Date(StartDateTime).toISOString();
    const EndIsoDate = new Date(EndDataTime).toISOString();
    data.startDate = startIsoDate;
    data.endDate = EndIsoDate;
    data.credits = Number(data.credits)
    console.log("data", data);
    const res = await addCourse(data).unwrap();
    if (res?.data) {
      toast.success(res?.message);
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Add new Course"
        buttonText="Add Course"
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
      >
        <EDForm onSubmit={onSubmit}>
          <div className="py-1">
            <EDInput label="Name" name="name" required></EDInput>
          </div>
          <div className="py-1">
            <EDInput label="Description" name="description"></EDInput>
          </div>
          <div className="py-1">
            <EDInput label="Credits" name="credits" required></EDInput>
          </div>
          <div className="py-1">
            <EDDateTime
              name="startDate"
              label="Start Date & Time"
              type="datetime-local"
              size="sm"
            />
          </div>
          <div className="py-1">
            <EDDateTime
              name="endDate"
              label="End Date & Time"
              type="datetime-local"
              size="sm"
            />
          </div>
          <div className="py-1">
            <EDInput label="Photo" name="photo" required></EDInput>
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

export default AddCourseModal;
