export type GenericResponse = {
	id: string;
	status: string;
	qr_code: string;
	meta: MetaHateoas;
	image_url: string;
	created_at: string;
	data: ResponseData[];
};

export type MetaHateoas = {
	last_key: string;
	location: string;
};

export type ResponseData = {
	id: string;
	status: string;
	created_at: string;
	phone_number: string;
	connected_at: string;
	disconnected_at: string;
	disconnected_reason: string;
};
