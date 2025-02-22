import {
  Button,
  Input,
  Card,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from "react";
const TABLE_HEAD = ["Title", "Banner", "Actions"];
import { useForm } from "react-hook-form";
import {
  useDeleteBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useUploadBannerMutation,
} from "../../Features/api/exclusive.api";
import { ToastSucess } from "../../utils/Toast";
const Banner = () => {
  const [open, setOpen] = React.useState(false);
  const [tempdata, settempdata] = useState({});
  const [updatevalue, setupdatevalue] = useState({
    title: "",
    image: "",
  });
  const { data } = useGetAllBannerQuery();
  const [updateBanner, { isLoading: updateLoading, isError }] =
    useUpdateBannerMutation();
  const [uploadBanner, { isLoading, isError: bannerError }] =
    useUploadBannerMutation();

  const [
    DeleteBanner,
    { isLoading: DeleteBannerloading, isError: DeleteBannerError },
  ] = useDeleteBannerMutation();
  const handleOpen = (...obj) => {
    settempdata(obj[0]);
    setOpen(!open);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleuploadBanner = async (data) => {
    try {
      const from = new FormData();
      from.append("title", data.title);
      from.append("image", data.image[0]);

      const response = await uploadBanner(from);
      if (response?.data?.data) {
        ToastSucess("Banner Upload Sucessfull");
      }
    } catch (error) {
      console.error("error from handleupload", error);
    } finally {
      reset();
    }
  };

  // handleupdate
  const handleupdate = async () => {
    try {
      const response = await updateBanner({ ...updatevalue, id: tempdata._id });
      console.log(response.data);
    } catch (error) {
      console.error("error from update banner");
    } finally {
      setOpen(false);
    }
  };

  // handleDelete
  const handleDelete = async (id) => {
    try {
      const response = await DeleteBanner(id);
    } catch (error) {
      console.log("error from handledelte method", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <form
        action=""
        className="flex flex-col gap-y-5"
        onSubmit={handleSubmit(handleuploadBanner)}
      >
        <Input
          size="md"
          label="Banner Title"
          color="black"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-500">
            Title is is required <span>*</span>
          </span>
        )}

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

        <Button variant="outlined" className="w-[130px]" type="submit">
          Upload
        </Button>
      </form>

      {/* banner list */}

      <Card className="h-[460px] w-full overflow-y-scroll">
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
            {data?.data
              ?.slice()
              .reverse()
              .map(({ title, image, _id }, index) => {
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
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-full  flex justify-center">
                        <div className=" h-[200px]   w-[40%] shadow-2xl">
                          <img
                            src={image}
                            alt={image}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-x-3 justify-center">
                        {DeleteBannerloading ? (
                          <Button color="blue">loading</Button>
                        ) : (
                          <Button color="red" onClick={() => handleDelete(_id)}>
                            Delete
                          </Button>
                        )}

                        <Button
                          color="green"
                          onClick={() => handleOpen({ title, image, _id })}
                        >
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

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogBody className="flex flex-col gap-y-5">
          <Input
            size="md"
            label="Banner Title"
            color="black"
            defaultValue={tempdata.title}
            name="title"
            onChange={(e) =>
              setupdatevalue({ ...updatevalue, title: e.target.value })
            }
          />
          <div class="flex items-center gap-x-4 justify-center w-full">
            <div className="w-full h-full">
              <img
                src={tempdata.image}
                alt=""
                className=" rounded-2xl  object-cover"
              />
            </div>
            <label
              for="dropzone-file2"
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
                id="dropzone-file2"
                type="file"
                class="hidden"
                onChange={(e) =>
                  setupdatevalue({ ...updatevalue, image: e.target.files[0] })
                }
              />
            </label>
          </div>
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
          {updateLoading ? (
            <Button variant="gradient" color="green" onClick={handleupdate}>
              <span>loading ..</span>
            </Button>
          ) : (
            <Button variant="gradient" color="green" onClick={handleupdate}>
              <span>Update</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Banner;
