import React, { useContext, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

function SearchBar() {
	const text = useRef("");
	
	const onChange = e => {
		if (text.current.value !== "") {
			// searchPost(e.target.value);
		} else {
			// clearPost();
		}
	};

	return (
		<form className="search-form">
			<input
				type="text"
				ref={text}
				placeholder="Search Posts"
				onChange={onChange}
				name=""
				className="search"
			/>
			<IconButton aria-label="search" className="search-icon">
				<SearchIcon />
			</IconButton>
		</form>
	);
}

export default SearchBar;
