namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BusModels",
                c => new
                    {
                        BusModelId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.BusModelId);
            
            CreateTable(
                "dbo.Seats",
                c => new
                    {
                        SeatId = c.Int(nullable: false, identity: true),
                        BusModelId = c.String(maxLength: 128),
                        SeatNumber = c.Int(nullable: false),
                        Left = c.String(),
                        Top = c.String(),
                    })
                .PrimaryKey(t => t.SeatId)
                .ForeignKey("dbo.BusModels", t => t.BusModelId)
                .Index(t => t.BusModelId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Seats", new[] { "BusModelId" });
            DropForeignKey("dbo.Seats", "BusModelId", "dbo.BusModels");
            DropTable("dbo.Seats");
            DropTable("dbo.BusModels");
        }
    }
}
