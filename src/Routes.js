import React from "react";

import Home from "./containers/Home";
import Form from "./containers/Form";
import { Route, Routes } from "react-router-dom";

export default function MyRoutes(props) {
	const { tableRows, pokemonTypesOptions } = props;

	return (
		<div>
			<Routes>
				<Route path="/">
					<Route index path="/" element={<Home />} />
					<Route
						path="home"
						element={<Form pokemonTypesOptions={pokemonTypesOptions} />}
					/>
					<Route
						path="form/:name" // ? wich path?
						element={
							<Form
								pokemonTypesOptions={pokemonTypesOptions}
								tableRows={tableRows}
							/>
						}
					/>
					<Route index path="*" element={<Home tableRows={tableRows} />} />
				</Route>
			</Routes>
		</div>
	);
}
