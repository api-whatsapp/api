import { WhatsappService } from "../services/whatsappService";

export class WhatsappController {
	private waService: WhatsappService;

	constructor() {
		this.waService = new WhatsappService();
	}

	public async runInstance() {
		await this.waService.init();
	}
}
