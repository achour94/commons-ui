/**
 * Copyright (c) 2026, RTE (http://www.rte-france.com)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { InferType, object, string } from 'yup';
import { modificationPropertiesSchema } from '../../common/properties/propertyUtils';
import { FieldConstants } from '../../../../utils';

export const substationModificationFormSchema = object()
    .shape({
        [FieldConstants.EQUIPMENT_NAME]: string().nullable(),
        [FieldConstants.COUNTRY]: string().nullable(),
    })
    .concat(modificationPropertiesSchema);

export type SubstationModificationFormData = InferType<typeof substationModificationFormSchema>;

export const substationModificationEmptyFormData: SubstationModificationFormData = {
    [FieldConstants.EQUIPMENT_NAME]: '',
    [FieldConstants.COUNTRY]: null,
    [FieldConstants.ADDITIONAL_PROPERTIES]: [],
};
