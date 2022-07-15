const router = require("express").Router();
const messagingController = require("../controllers/messaging.controller");
const messagingService = require("../services/messaging.services");

router.post("/webhook", messagingController.setupWebhook);
router.post("/webhook/recieve", messagingService.receiverWebhookMessage);
router.post("/setup", messagingController.setupConnection);
router.post("/send", messagingController.sendAndRecieveMessage);
router.get(
  "/listOfInteractionMessages",
  messagingController.listAllMessagesForBothParties
);

module.exports.messagingRouter = router;
