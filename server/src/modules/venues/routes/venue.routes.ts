import { Router } from "express";
import * as venueController from "../controllers/venue.controller";
import { authenticate } from "../../auth/middleware/auth.middleware";
import { authorize } from "../../auth/middleware/auth.middleware";
import { validate } from "../../../shared/middleware";
import {
  createVenueSchema,
  updateVenueSchema,
  venueStatusSchema,
} from "../validators/venue.validator";
import { asyncHandler } from "../../../shared/utils";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", asyncHandler(venueController.list));
router.get("/:id", asyncHandler(venueController.getById));

router.post(
  "/",
  authenticate,
  validate(createVenueSchema),
  asyncHandler(venueController.create)
);

router.patch(
  "/:id",
  authenticate,
  validate(updateVenueSchema),
  asyncHandler(venueController.update)
);

router.delete(
  "/:id",
  authenticate,
  asyncHandler(venueController.remove)
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(venueStatusSchema),
  asyncHandler(venueController.updateStatus)
);

router.post(
  "/:id/images",
  authenticate,
  upload.array("images", 10),
  asyncHandler(venueController.addImages)
);

router.delete(
  "/:id/images",
  authenticate,
  asyncHandler(venueController.removeImage)
);

export default router;
