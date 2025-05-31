export class PostgisUtils {
	static createPostgisPoint(lng: number, lat: number) {
		return `ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;
	}
}
