export type UsePokemonsFn = () => { isLoading: boolean; data: any[]; error: unknown };

export type UsePokemonsTypesFn = () => { isLoading: boolean; data: any[]; error: unknown };


export type PokemonItem = {
	name: string;
	url: string;
};

export type PokemonListResponse = {
	count: number;
	next: null;
	previous: null;
	results: PokemonItem[];
};

export type PokemonTypes = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export type PokemonDetails = {
	id: number;
	name: string;
	types: PokemonTypes[];
	height: number;
	weight: number;
	sprites: {
		front_default: string;
	};
};

export type PokemonDetailsForTable = Pick<PokemonDetails['sprites'], 'front_default'> &
	Pick<PokemonDetails, 'id' | 'name' | 'height' | 'weight'> & { types: string[] };