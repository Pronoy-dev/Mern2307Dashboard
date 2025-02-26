import React from "react";
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
} from "@material-tailwind/react";
import { useForm } from "react-hook-form"
import { useGetAllCategoryQuery, useUploadCategoryMutation } from "../../Features/api/exclusive.api";
import { ToastSucess } from "../../utils/Toast";
const Category = () => {
  const [open, setOpen] = React.useState(false);
  const TABLE_HEAD = ["Name", "image", "product", "subcategory" ,"Actions"];

  const handleOpen = () => setOpen(!open);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const [uploadCategory , {isLoading , isError}] = useUploadCategoryMutation();
  const {data , isLoading:categoryLoading , isError:categoryError}  = useGetAllCategoryQuery()
  // handleCategoryUpload
  const handleCategoryUpload = async(data) => {

    try {
      const fromdata = new FormData();
      fromdata.append('name' , data.name);
      fromdata.append('image' , data.image[0]);
      const response =  await uploadCategory(fromdata);
      if(response.data.data){
        ToastSucess("banner Create sucessful")
      }
    } catch (error) {
      console.log('error from upload category' , error)
      
    }finally{
      reset()
    }
    
  }

  console.log(data?.data);
  
  return (
   <>
    {isError && ( <h1>Error Hoice</h1>)}
    <div className="flex flex-col gap-y-5">

      <form action="" className="flex flex-col gap-y-5"  onSubmit={handleSubmit(handleCategoryUpload)}>
      <Input size="md" label=" Name" color="black"  {...register("name", { required: true })}/>
      {errors.name && <span className="text-red-500">This name  field is required</span>}
      <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">
                image is is required <span>*</span>
              </span>
            )}
          </label>
        </div>
      <Button
        variant="filled"
        type="submit"
        color="green"
        loading={isLoading}
        className="w-[20%]"
      >
        Upload
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
            {data?.data?.slice().reverse().map(({ name, image, subcategory , product  , _id}, index) => {
              const isLast = index === data?.data?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50 text-center";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                  <div className="w-[300px] h-auto">
                    <img src={image} alt={image} className="w-full h-full rounded-md" />
                  </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {subcategory?.length}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product?.length}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-x-3 justify-center">
                      <Button color="red">Delete</Button>
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
          <Textarea color="gray" label="Descrioption" />
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
   </>
  );
};

export default Category;
