import React, { useState } from "react";
import {
  Textarea,
  Input,
  Button,
  Card,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  useSelect,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  useDeleteSubCategoryMutation,
  useGetAllCategoryQuery,
  useGetAllSubCategoryQuery,
  useUploadSubCategoryMutation,
} from "../../Features/api/exclusive.api";
import { ToastSucess } from "../../utils/Toast";
const Subcategory = () => {
  const [open, setOpen] = React.useState(false);
  const TABLE_HEAD = ["SubCategory", "Category ", "Products", "Actions"];

  const { data, isLoading, isError } = useGetAllCategoryQuery();

  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm();
  const [uploadSubCategory, { isLoading: subcategoryLoading }] =
    useUploadSubCategoryMutation();
  const onSubmit = async (data) => {
    try {
      const response = await uploadSubCategory(data);

      if (response.data.data) {
        ToastSucess("sub Category Created Sucessfull");
      }
    } catch (error) {
      console.log("error is ", error);
    } finally {
      reset();
    }
  };
  // useGetAllSubCategoryQuery
  const {
    data: subdata,
    isError: subError,
    isLoading: subLoading,
  } = useGetAllSubCategoryQuery();


  // handledeleteSubcategory
  const [delteditem , setdelteditem] = useState(null)
  const [DeleteSubCategory, { isLoading: deltesub }] = useDeleteSubCategoryMutation();
  const handledeleteSubcategory = async (id) => {
    try {
      setdelteditem(id)
      const reponse = await DeleteSubCategory(id);
      
      
    } catch (error) {
      console.log("error from delte sub category", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-5">
      <form
        action=""
        className="flex flex-col gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          size="md"
          label="SubCategory Name"
          color="black"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        {!isLoading && (
          <Select
            color="purple"
            label="Select Category"
            value={watch("category")} // Get current value from React Hook Form
            onChange={(e) => setValue("category", e)} // Manually update RHF value
            onBlur={() => trigger("category")} // Trigger validation
          >
            {data?.data?.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        )}

        {errors.category && <span>This category is required</span>}
        <Button
          variant="filled"
          color="green"
          loading={subcategoryLoading}
          type="submit"
          className="w-[20%]"
        >
          Create
        </Button>
      </form>

      {/* category list */}
      <Card className="h-[575px] mt-10 w-full overflow-y-scroll">
        <table className="w-full  text-center">
          <thead className="sticky top-0 z-10">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subdata?.data?.map((item, index) => {
              const isLast = index === subdata?.data?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50 text-center";

              return (
                <tr key={item._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.category.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.product?.length}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-x-3 justify-center">
                      <Button
                        color="red"
                        loading= {delteditem === item._id && deltesub }
                        onClick={() => handledeleteSubcategory(item._id)}
                      >
                        Delete
                      </Button>
                      <Button color="green" onClick={handleOpen}>
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* dialouge box */}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="flex flex-col gap-y-5 p-10">
          <Input size="md" label=" Name" color="black" />
          <Select color="purple" label="Select Category">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Subcategory;
