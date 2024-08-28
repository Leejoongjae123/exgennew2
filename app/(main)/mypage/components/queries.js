"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Chip,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Card,
  CardBody,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { ChevronDownIcon, SearchIcon } from "@nextui-org/shared-icons";
import { useAsyncList } from "@react-stately/data";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
function queries() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [queryId, setQueryId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg", // initial placeholder images
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
  ]);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const supabase = createClient();
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = URL.createObjectURL(file);
      setSelectedImages(updatedImages);
    }
  };
  const handleImageClick = (index) => {
    // Trigger a hidden file input click when an image is clicked
    document.getElementById(`imageInput${index}`).click();
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const uploadImages = async () => {
      const uploadPromises = selectedImages
        .filter((image) => !image.includes("product-3"))
        .map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();
          const fileExt = image.split(".").pop();
          const fileName = `${Date.now()}-${index}.jpg`;
          const filePath = `images/${fileName}`;
          console.log("filePath:", filePath);
          console.log("fileName:", fileName);

          const { data, error } = await supabase.storage
            .from("images")
            .upload(filePath, blob);

          if (error) {
            console.error("Error uploading image:", error);
            return null;
          }

          return (
            "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/images/" +
            data.path
          );
        });

      const imagePaths = await Promise.all(uploadPromises);
      return imagePaths.filter((path) => path !== null);
    };

    uploadImages()
      .then((paths) => {
        console.log("Uploaded image paths:", paths);

        const insertBoast = async () => {
          const { data, error } = await supabase.from("queries").insert([
            {
              question: question,
              answer: "",
              images: paths,
              creator: "관리자",
            },
          ]);

          if (error) {
            console.error("Error inserting boast:", error);
          } else {
            console.log("Boast inserted successfully:", data);
          }
        };

        insertBoast();
        setQuestion("");
        setAnswer("");
        setIsLoading(false);
        setIsCompleted(true);
        setSelectedImages([
          "/images/product/product-3.jpg", // initial placeholder images
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
        ]);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsLoading(false);
      });
  };

  const getDatas = async () => {
    const { data, error, count } = await supabase
      .from("queries")
      .select("*", { count: "exact" })
      .ilike("question", `%${search}%`)
      .order("id", { ascending: false })
      .range(pageSize * (currentPage - 1), pageSize * currentPage - 1);
    if (error) {
      console.error("Error fetching queries:", error);
    } else {
      console.log("Queries fetched successfully:", data);
      setDatas(data);
      setTotalPages(Math.ceil(count / pageSize));
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedGetDatas = debounce(getDatas, 500);

  useEffect(() => {
    debouncedGetDatas();
  }, [currentPage, pageSize, search]);


  const getAnswer = async (queryId) => {
    const { data, error } = await supabase
      .from("queries")
      .select("*")
      .eq("id", parseInt(queryId))
      .single();
    if (error) {
      console.error("Error fetching queries:", error);
    } else {
      console.log("Queries fetched successfully:", data);
    }
    console.log("data:", data);
    setAnswer(data.answer);
  };

  console.log("queryId:", queryId);
  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <Modal isOpen={isOpen1} onOpenChange={onOpenChange1}>
        <ModalContent>
          {(onClose1) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                답변내용
              </ModalHeader>
              <ModalBody>
                <p>{answer}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose1}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose2) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                문의하기
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="상세하게 내용 작성 부탁드립니다."
                  className="w-full"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <div className="flex flex-wrap gap-x-5 justify-start items-center gap-y-5 my-5">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 relative rounded cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        fill
                        src={image}
                        alt={`Selected image ${index + 1}`}
                        className="rounded-2xl"
                      />
                      <input
                        id={`imageInput${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSubmit();
                    onClose2();
                  }}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CardBody>
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            className="w-full"
            placeholder="검색어를 입력하세요"
            startContent={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={onOpen2} color="default" variant="bordered">
            작성하기
          </Button>
        </div>
        <div className="my-5">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-3/5 text-center">제목</TableColumn>
              <TableColumn className="w-1/5 text-center">작성일</TableColumn>
              <TableColumn className="w-1/5 text-center">답변</TableColumn>
            </TableHeader>
            <TableBody>
              {datas.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="w-3/5 text-center">
                    {data.question}
                  </TableCell>
                  <TableCell className="w-1/5 text-center">
                    {new Date(data.regiDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="w-1/5 text-center">
                    {data.answer && (
                      <Button color="" variant="bordered" size="sm" 
                        onClick={() => {
                          onOpen1();
                          getAnswer(data.id);
                        }}
                      >
                        답변보기
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center my-5">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default queries;