import { Button } from "@nextui-org/button";
import EDForm from "../form/EDForm";
import EDInput from "../form/EDInput";
import Loading from "../UI/loading";
import FXModal from "./FXModal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EDDateTime from "../form/EDDateTime";
import { useAddclassMutation } from "@/src/redux/features/class/classApi";

const AddClassDataModal = ({ courseId }: { courseId: any }) => {
  const [addClass, { error, isLoading }] = useAddclassMutation();
  // if (error) {
  //   toast.error((error as any)?.data?.message);
  // }
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      data.courseId = courseId;
    const res = await addClass(data).unwrap();
    if (res?.data) {
      toast.success(res?.message);
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        title="Add Class"
        buttonText="Add Class"
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
            <EDInput label="Location" name="location" required></EDInput>
          </div>
          <div className="py-1">
            <EDDateTime
              name="startTime"
              label="Start Date & Time"
              type="datetime-local"
              size="sm"
            />
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

export default AddClassDataModal;
