import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getBlogs } from "../../api/blogs";
import BlogCard from "../Blogs/BlogCard";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {toast} from "react-toastify";

export default function Blogs() {
  // TODO: read the default values from URL query params
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("createdAt");
  // eslint-disable-next-line
  const [sortOrder, setSortOrder] = useState("desc");
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    getBlogs(page, pageSize, search, sortBy, sortOrder)
    .then(response => {
      const {data: result} = response;

      const {records, totalRecords} = result.data;

      setBlogs(records)
      setTotalBlogs(totalRecords)
    })
    .catch(() => {
      toast('Something went wrong', {
        type: 'error'
      })
    })
  }, [page, pageSize, search, sortBy, sortOrder]);

  function handleChangePage(event, page) {
    setPage(page + 1);
  }

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort By"
              size="small"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value={"createdAt"}>Recently Added</MenuItem>
              <MenuItem value={"commentCount"}>Comments</MenuItem>
              <MenuItem value={"likeCount"}>Most Liked</MenuItem>
            </Select>
          </FormControl>
          <TablePagination
            component="div"
            count={totalBlogs}
            page={page - 1} // this component takes starting page as 0, but take it as 1
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>
      {blogs.map((blog, i) => {
        return <BlogCard key={i} blog={blog} variant="outlined" />;
      })}
    </div>
  );
}
