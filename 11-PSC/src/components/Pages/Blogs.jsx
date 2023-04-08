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

export default function Blogs() {
  // TODO: read the default values from URL query params
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  // eslint-disable-next-line
  const [sortOrder, setSortOrder] = useState("desc");
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);

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
          />
        </div>
      </div>
      {blogs.map((blog, i) => {
        return <BlogCard key={i} blog={blog} variant="outlined" />;
      })}
    </div>
  );
}
