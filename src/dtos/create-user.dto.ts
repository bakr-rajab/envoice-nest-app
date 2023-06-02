import { ApiProperty } from "@nestjs/swagger";

class Address {
    @ApiProperty()
    branchID: string
    @ApiProperty()
    country: string
    @ApiProperty()
    governate: string
    @ApiProperty()
    regionCity: string
    @ApiProperty()
    street: string
    @ApiProperty()
    buildingNumber: string
    @ApiProperty()
    postalCode: string
    @ApiProperty()
    floor: string
    @ApiProperty()
    landmark: string
    @ApiProperty()
    additionalInformation: string

}
export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    tax_number: number;

    @ApiProperty()
    activityCode: number;

    @ApiProperty()
    phone: string

    @ApiProperty()
    clientId: string

    @ApiProperty()
    clientSecret: string

    @ApiProperty()
    client_secret: string

    @ApiProperty()
    address: Address

    @ApiProperty()
    type: string

    @ApiProperty()
    role: string;


}

